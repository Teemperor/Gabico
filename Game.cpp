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
