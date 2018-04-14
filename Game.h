#ifndef SIMPLE_WEBSOCKET_SERVER_GAME_H
#define SIMPLE_WEBSOCKET_SERVER_GAME_H

#include <string>
#include <vector>
#include <unordered_map>
#include "json.hpp"
#include <random>
#include <set>

class Player {
public:
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

  void addNeighbor(Country *C) {
    Neighbors.push_back(C);
  }

  bool isNeighbor(Country *C) {
    return std::find(Neighbors.begin(), Neighbors.end(), C) == Neighbors.end();
  }

  bool attackOther(Country *Target) {
    if (!isNeighbor(Target))
      return false;
    if (Target->Owner == Owner)
      return false;
    if (Units <= 1)
      return false;

    std::vector<int> AttackRolls;
    for (unsigned i = 0; i < Units - 1; ++i) {
      AttackRolls.push_back(dis(gen));
      if (AttackRolls.size() >= 3)
        break;
    }
    std::sort(AttackRolls.rbegin(), AttackRolls.rend());

    std::vector<int> DefenceRolls;
    for (unsigned i = 0; i < Target->Units; ++i) {
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
    return true;
  }
};

class Game {
  std::vector<Country *> Countries;
  std::unordered_map<std::string, Country *> CountriesByName;
  std::vector<Player *> Players;
  std::size_t CurrentP = nullptr;
public:
  explicit Game(std::string Data);

  void attackCountry(std::string SourceName, std::string TargetName) {
    Country *Source, *Target;
    Source = getCountryByName(SourceName);
    Target = getCountryByName(TargetName);
    if (Source == nullptr || Target == nullptr) {
      return;
    }
    Source->attackOther(Target);
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

};


#endif //SIMPLE_WEBSOCKET_SERVER_GAME_H
