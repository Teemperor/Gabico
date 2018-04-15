#ifndef SIMPLE_WEBSOCKET_SERVER_GAME_H
#define SIMPLE_WEBSOCKET_SERVER_GAME_H

#include <string>
#include <vector>
#include <unordered_map>
#include "json.hpp"
#include <random>
#include <set>

class Player {
  uint32_t ID = 0;
public:
  Player(uint32_t ID) : ID(ID) {}

  uint32_t getID() const {
    return ID;
  }


};

class Country {
  std::string Name;
  std::vector<Country *> Neighbors;
  Player *Owner = nullptr;
  int Units = 5;

  std::random_device rd;
  std::mt19937 gen;
  std::uniform_int_distribution<> dis;

public:
  explicit Country(std::string Name) : Name(Name), gen(rd()), dis(1, 6) {
  }

  std::string getName() const {
    return Name;
  }

  Player *getOwner() const {
    return Owner;
  }

  void setOwner(Player *P) {
    Owner = P;
  }

  int getUnits() const {
    return Units;
  }

  void addNeighbor(Country *C) {
    Neighbors.push_back(C);
  }

  bool isNeighbor(Country *C) {
    return std::find(Neighbors.begin(), Neighbors.end(), C) != Neighbors.end();
  }

  nlohmann::json attackOther(Country *Target);
};

class Game {
  std::vector<Country *> Countries;
  std::unordered_map<std::string, Country *> CountriesByName;
  std::vector<Player *> Players;
  std::size_t CurrentP = 0;
public:
  explicit Game(std::string Data);

  nlohmann::json attackCountry(std::string SourceName, std::string TargetName) {
    Country *Source, *Target;
    Source = getCountryByName(SourceName);
    Target = getCountryByName(TargetName);
    if (Source == nullptr || Target == nullptr) {
      return nlohmann::json();
    }
    return Source->attackOther(Target);
  }


  void endRound() {
    ++CurrentP;
    CurrentP %= Players.size();
  }

  Country *getCountryByName(std::string Name) {
    auto It = CountriesByName.find(Name);
    if (It == CountriesByName.end())
      return nullptr;
    return It->second;
  }

  nlohmann::json createStatus() const {
    using nlohmann::json;
    json j;

    for (Country *C : Countries) {
      json CJ;
      CJ["owner"] = C->getOwner()->getID();
      CJ["units"] = C->getUnits();

      j[C->getName()] = CJ;
    }

    return j;
  }

};


#endif //SIMPLE_WEBSOCKET_SERVER_GAME_H
