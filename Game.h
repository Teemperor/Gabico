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
  int Units = 1;

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
    return std::find(Neighbors.begin(), Neighbors.end(), C) == Neighbors.end();
  }

  nlohmann::json attackOther(Country *Target) {
    if (!isNeighbor(Target) || Target->Owner == Owner || Units <= 1) {
      return nlohmann::json();
    }

    std::vector<int> AttackRolls;
    for (int i = 0; i < Units - 1; ++i) {
      AttackRolls.push_back(dis(gen));
      if (AttackRolls.size() >= 3)
        break;
    }
    std::sort(AttackRolls.rbegin(), AttackRolls.rend());

    std::vector<int> DefenceRolls;
    for (int i = 0; i < Target->Units; ++i) {
      DefenceRolls.push_back(dis(gen));
      if (DefenceRolls.size() >= 2)
        break;
    }
    std::sort(DefenceRolls.rbegin(), DefenceRolls.rend());

    if (AttackRolls.front() <= DefenceRolls.front()) {
      Units--;
    } else {
      Target->Units--;
    }
    if (DefenceRolls.size() >= 2 && AttackRolls.size() >= 2) {
      if (AttackRolls.at(1) <= DefenceRolls.at(1)) {
        Units--;
      } else {
        Target->Units--;
      }
    }

    if (Target->Units <= 0) {
      Target->Units = 1;
      Target->Owner = Owner;
      --Units;
    }

    nlohmann::json j;
    j["attackRolls"] = AttackRolls;
    j["defenceRolls"] = DefenceRolls;
    return j;
  }
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
