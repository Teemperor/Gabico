#include <fstream>
#include "client_ws.hpp"
#include "server_ws.hpp"
#include "Game.h"
#include <chrono>

using namespace std;

using WsServer = SimpleWeb::SocketServer<SimpleWeb::WS>;
using WsClient = SimpleWeb::SocketClient<SimpleWeb::WS>;

int main() {
  std::this_thread::sleep_for(std::std);

  // WebSocket (WS)-server at port 8080 using 1 thread
  WsServer server;
  server.config.port = 8081;

  std::ifstream t("Data.js");
  std::stringstream buffer;
  buffer << t.rdbuf();

  std::string Data = buffer.str();
  auto PrefixLen = strlen("countries =");

  Game TheGame(Data.substr(PrefixLen));

  auto &echo_all = server.endpoint["^/echo_all/?$"];
  echo_all.on_message = [&server](shared_ptr<WsServer::Connection> /*connection*/, shared_ptr<WsServer::Message> message) {
    auto send_stream = make_shared<WsServer::SendStream>();
    *send_stream << message->string();

    // echo_all.get_connections() can also be used to solely receive connections on this endpoint
    for(auto &a_connection : server.get_connections()) {
      a_connection->send(send_stream);
    }
  };

  thread server_thread([&server]() {
    server.start();
  });

  server_thread.join();
}
