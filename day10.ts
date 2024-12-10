enum Gift {
  Coal,
  Train,
  Bicycle,
  SuccessorToTheNintendoSwitch = 1 << 2, // Binary: 00100
  TikTokPremium = 1 << 3, // Binary: 01000
  Vape = 1 << 4, // Binary: 10000
  Traditional = Gift.Train | Gift.Bicycle,
  OnTheMove = Gift.Coal | Gift.Bicycle | Gift.TikTokPremium | Gift.Vape,
  OnTheCouch = (Gift.OnTheMove & ~Gift.Bicycle) |
    Gift.SuccessorToTheNintendoSwitch,
}
