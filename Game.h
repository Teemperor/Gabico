#ifndef SIMPLE_WEBSOCKET_SERVER_GAME_H
#define SIMPLE_WEBSOCKET_SERVER_GAME_H

#include <string>
#include <vector>
#include <unordered_map>
#include "json.hpp"

class Player {
public:
};

class Country {
  std::string Name;
  std::vector<Country *> Neighbors;
  Player *Owner = nullptr;
  int Units = 1;
public:
  Country() {
  }
};

class Game {
  std::vector<Country> Countries;
  std::unordered_map<std::string, Country *> CountriesByName;
  std::vector<Player> Players;
public:
  Game(std::string Data) {
    auto j3 = nlohmann::json::parse(Data);;
  }

};


#endif //SIMPLE_WEBSOCKET_SERVER_GAME_H
