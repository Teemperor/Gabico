#ifndef SIMPLE_WEBSOCKET_SERVER_GAME_H
#define SIMPLE_WEBSOCKET_SERVER_GAME_H

#include <string>
#include <vector>
#include <unordered_map>

class Player {
public:
};

class Country {
  std::string Name;
  std::vector<Country *> Neighbors;
  Player *Owner = nullptr;
  int Units = 1;
public:

};

class Game {
  std::vector<Country> Countries;
  std::unordered_map<std::string, Country *> CountriesByName;
  std::vector<Player> Players;
public:

};


#endif //SIMPLE_WEBSOCKET_SERVER_GAME_H
