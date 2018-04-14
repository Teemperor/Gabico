#include <fstream>
#include "client_ws.hpp"
#include "server_ws.hpp"
#include "Game.h"
#include <chrono>

using namespace std;

using WsServer = SimpleWeb::SocketServer<SimpleWeb::WS>;
using WsClient = SimpleWeb::SocketClient<SimpleWeb::WS>;

int main() {
  std::this_thread::sleep_for(std::chrono::seconds(1));

  // WebSocket (WS)-server at port 8080 using 1 thread
  WsServer server;
  server.config.port = 8081;

  std::stringstream buffer;
  {
    std::ifstream t("Data.js");
    buffer << t.rdbuf();
  }

  std::string Data = buffer.str();
  auto PrefixLen = strlen("countries =");

  Game TheGame(Data.substr(PrefixLen));

  auto &echo_all = server.endpoint["^/echo_all/?$"];
  echo_all.on_message = [&server, &TheGame](shared_ptr<WsServer::Connection> connection, shared_ptr<WsServer::Message> message) {
    std::string Msg = message->string();

    istringstream iss(Msg);

    std::vector<std::string> Parts;
    auto send_stream = make_shared<WsServer::SendStream>();

    do
    {
      string P;
      iss >> P;
      Parts.push_back(P);
    } while (iss);

    if (Parts.front() == "ATTACK")
      *send_stream << TheGame.attackCountry(Parts.at(1), Parts.at(2)).dump();
    else if (Parts.front() == "PING") {
      *send_stream << TheGame.createStatus().dump();
    }
    connection->send(send_stream);
    // echo_all.get_connections() can also be used to solely receive connections on this endpoint
    //for(auto &a_connection : server.get_connections()) {
    //  a_connection->send(send_stream);
    //}
  };

  std::cout << "Starting server" << std::endl;
  thread server_thread([&server]() {
    server.start();
  });

  server_thread.join();
}
