# 🚀 ZACZNIJ TUTAJ - Przepiśnik Flutter na Androida

Witaj! Masz tutaj **pełny projekt Flutter** - aplikacja receptur ported z React do Dart/Flutter z zachowaniem stylu 1:1.

## ⚡ TL;DR (5 minut)

Jeśli masz już Flutter zainstalowany:

```bash
# 1. Rozpakuj folder flutter_app

# 2. Zainstaluj zależności
flutter pub get

# 3. Uruchom na emulatorze
flutter run

# GOTOWE! 🎉
```

## 📖 Instrukcje Pełne

Wybierz swoją sytuację:

### ✅ Mam Flutter zainstalowany
→ Czytaj: **QUICKSTART.md**

### ❌ Nie mam Flutter
→ Czytaj: **SETUP.md** (kompletna instalacja krok po kroku)

### 🤔 Chcę zrozumieć strukturę
→ Czytaj: **PROJECT_MANIFEST.md** (wszystkie detale)

### 📚 Chcę pełną dokumentację
→ Czytaj: **README.md** (overview + features)

## 📱 Co To Jest?

**Przepiśnik** to aplikacja do zarządzania przepisami na Androida z:

✅ **6 ekranów**:
- Home (lista z wyszukiwaniem, filtry, sortowanie)
- Szczegóły receptury (ingredients, steps, dodaj do listy)
- Ulubione
- Lista zakupów
- Kategorie
- Dodaj nowy przepis

✅ **Funkcje**:
- 🔍 Wyszukiwanie w real-time
- 📂 Filtry po kategoriach
- ⭐ System ulubionych
- 🛒 Zarządzanie listą zakupów
- 💾 Dane przechowywane lokalnie (offline)
- 🎨 Piękny design z animacjami

✅ **Technologia**:
- Flutter 3.0+
- Dart 3.0+
- Provider (state management)
- SharedPreferences (local storage)
- Material Design 3

## 📁 Co Znajdziesz

```
flutter_app/
├── 📄 START_HERE.md         ← CZYTAJ NAJPIERW (ten plik)
├── 📄 QUICKSTART.md         ← Szybki start (jeśli masz Flutter)
├── 📄 SETUP.md              ← Kompletna instalacja
├── 📄 README.md             ← Dokumentacja
├── 📄 PROJECT_MANIFEST.md   ← Detale projektu
│
├── lib/
│   ├── main.dart            ← Punkt wejścia
│   ├── models/              ← Modele danych
│   ├── providers/           ← State management
│   ├── screens/             ← 6 ekranów
│   ├── widgets/             ← Komponenty
│   └── utils/               ← Kolory, dane
│
├── android/                 ← Konfiguracja Android
└── pubspec.yaml            ← Zależności
```

## 🎯 Następne Kroki

### Dla Niecierpliwych 🏃

```bash
# Jeśli masz Flutter (flutter doctor pokazuje zielone ✓)
flutter pub get
flutter run

# Jeśli nie masz Flutter
# → Przejdź do SETUP.md
```

### Dla Systematycznych 📋

1. **Czytaj SETUP.md** - instalacja Flutter (15 min)
2. **Czytaj QUICKSTART.md** - uruchomienie projektu (5 min)
3. **Eksploruj kod** w `lib/` - 10-20 min
4. **Testuj aplikację** - sprawdź wszystkie ekrany
5. **Edytuj kod** - spróbuj zmienić kolory, teksty
6. **Buduj APK** - pakuj aplikację (10 min)

## ✨ Quick Tests

Po uruchomieniu aplikacji spróbuj:

```
☐ Otwórz Home Screen - powinna być lista przepisów
☐ Szukaj "spaghetti" - powinien znaleźć recepturę
☐ Filtruj po "Obiad" - tylko opiady
☐ Sortuj "A-Z" - alfabetycznie
☐ Kliknij przepis - powinny być szczegóły
☐ Zaznacz serce - dodaj do ulubionych
☐ "Dodaj do listy" - ingredienty pójdą na listę
☐ Wejdź na "Ulubione" - powinien być tam twój przepis
☐ Wejdź na "Listę" - składniki są tam
☐ Zaznacz checkbox - jak w zakupy
☐ Wejdź "Kategorie" - wszystkie kategorie
☐ Wejdź "Nowy przepis" - formualrz dodawania
```

Jeśli wszystko działa → **GRATULACJE!** 🎉

## 🆘 Problem?

### "flutter: command not found"
→ Czytaj SETUP.md, sekcja "Instalacja Flutter"

### "App się crashuje"
→ Uruchom `flutter logs` i szukaj błędów
→ Czytaj SETUP.md, sekcja "Troubleshooting"

### "Emulator nie startuje"
→ Czytaj SETUP.md, sekcja "Emulator is too slow"

### Inne problemy
→ Czytaj SETUP.md, sekcja "Troubleshooting"

## 🔗 Przydatne Linki

- **Flutter**: https://flutter.dev
- **Dart**: https://dart.dev
- **Material Design**: https://material.io
- **Provider Docs**: https://pub.dev/packages/provider
- **Stack Overflow**: https://stackoverflow.com/questions/tagged/flutter

## 💡 Wskazówki

### Development
```bash
flutter run          # Uruchom na emulatorze
# Naciśnij 'r' w terminalu aby reload (hot reload!)
# Naciśnij 'q' aby wyjść

flutter logs         # Zobacz logat
flutter clean        # Wyczyść build
flutter analyze      # Check errors
```

### Edytowanie
- Otwórz `lib/main.dart` w edytorze
- Zmień kolor: `lib/utils/colors.dart`
- Zmień dane: `lib/utils/sample_data.dart`
- Naciśnij `r` - widisz zmiany na żywo!

### Publikacja
```bash
flutter build apk --release
# APK będzie w: build/app/outputs/flutter-apk/app-release.apk
# Wyślij do telefonu i zainstaluj!
```

## 🎓 Learning Path

Jeśli chcesz nauczyć się Flutter:

1. **Basics** (czytaj dokumenty):
   - Flutter kostrukcja (widgets, state)
   - BuildContext
   - hot reload

2. **This Project** (czytaj kod):
   - `lib/main.dart` - app structure
   - `lib/models/recipe.dart` - data models
   - `lib/screens/home_screen.dart` - UI
   - `lib/providers/recipe_provider.dart` - state

3. **Experiment**:
   - Zmień kolory
   - Dodaj nowe pole
   - Stwórz nowy ekran
   - Deploy na Play Store

## ❓ FAQ

**P: Czy mogę używać to jako starter template?**
O: Oczywiście! Skopiuj kod, zmień branding, publikuj!

**P: Czy źródła są dostępne?**
O: Tak! Cały kod jest tutaj, zmodyfikuj co chcesz.

**P: Jak to opublikować na Google Play?**
O: Czytaj sekcję Deployment w SETUP.md

**P: Czy działa offline?**
O: Tak! Wszystkie dane są lokalne.

**P: Czy mogę portować do iOS?**
O: Tak! Flutter obsługuje iOS (potrzebujesz macOS + Xcode)

## 🎉 Ready?

Wybierz:

```
Mam Flutter     → flutter pub get && flutter run
Nie mam Flutter → czytaj SETUP.md
Nie wiem        → czytaj QUICKSTART.md
```

---

## 📞 Support

- Dokumentacja: siehe README.md
- Instalacja: zobacz SETUP.md
- Szybki start: zobacz QUICKSTART.md
- Detale: zobacz PROJECT_MANIFEST.md
- Flutter help: flutter doctor -v

---

**Powodzenia! Baw się dobrze tworzeniem aplikacji! 🚀**

*Projekt stworzony: 2024*
*Flutter 3.0+ | Dart 3.0+ | Android 5.0+*
