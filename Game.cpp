#include <iostream>
#include "Game.h"

Game::Game(std::string Data) {
  auto j = nlohmann::json::parse(Data);
  for (auto it = j.begin(); it != j.end(); ++it) {
    std::string Name = it.key();
    Country *C = new Country(it.key());
    Countries.push_back(C);
    CountriesByName[Name] = C;
  }

  for (auto it = j.begin(); it != j.end(); ++it) {
    std::string Name = it.key();
    for (std::string V : it.value()["neighbors"]) {
      Country *C = getCountryByName(V);
      assert(C);
      CountriesByName[Name]->addNeighbor(C);
    }
  }

  Players.resize(4);
  for (std::size_t i = 0; i < Players.size(); ++i) {
    Players[i] = new Player(i);
  }

  auto CountriesToAssign = Countries;

  std::random_device rd;
  std::mt19937 g(rd());

  std::shuffle(CountriesToAssign.begin(), CountriesToAssign.end(), g);

  auto PartSize = CountriesToAssign.size() / Players.size();

  std::size_t Index = 0;
  std::size_t PlayerIndex = 0;
  for (auto &i : CountriesToAssign) {
    if (Index > PartSize) {
      Index = 0;
      ++PlayerIndex;
    }
    ++Index;
    i->setOwner(Players.at(PlayerIndex));
  }
}

nlohmann::json Country::attackOther(Country *Target) {

  nlohmann::json j;
  if (!isNeighbor(Target)) {
    j["error"] = Target->getName() + " is not a neighbor country of " + getName();
    return j;
  }
  if (Target->Owner == Owner) {
    j["error"] = Target->getName() + " is a friendly country of " + getName();
    return j;
  }
  if (Units <= 1) {
    j["error"] = Target->getName() +  " can't be attacked with 1 unit from " + getName();
    return j;
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
  j["attackRolls"] = AttackRolls;
  j["defenceRolls"] = DefenceRolls;
  return j;
}
