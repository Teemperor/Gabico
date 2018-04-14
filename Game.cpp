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
}
