# Przepiśnik Flutter - Instrukcja Kompletnej Instalacji

## 📋 Spis Treści

1. [Wymagania Systemowe](#wymagania-systemowe)
2. [Instalacja Flutter](#instalacja-flutter)
3. [Setup Projektu](#setup-projektu)
4. [Uruchamianie Aplikacji](#uruchamianie-aplikacji)
5. [Testowanie Funkcji](#testowanie-funkcji)
6. [Budowanie APK](#budowanie-apk)
7. [Troubleshooting](#troubleshooting)

## 🖥️ Wymagania Systemowe

### Windows
- **OS**: Windows 7 SP1 lub nowszy (64-bit)
- **RAM**: minimum 8 GB (16 GB rekomendowane)
- **Dysk**: 5 GB wolnego miejsca
- **Android Studio**: https://developer.android.com/studio
- **JDK**: Java 11 LTS

### macOS
- **OS**: macOS 10.11 (El Capitan) lub nowsze
- **RAM**: minimum 8 GB
- **Dysk**: 5 GB wolnego miejsca
- **Xcode**: z App Store (opcjonalnie, jeśli chcesz iOS)

### Linux (Ubuntu/Debian)
- **OS**: Ubuntu 18.04 LTS lub nowsze
- **RAM**: minimum 8 GB
- **Dysk**: 5 GB wolnego miejsca

## 📱 Instalacja Flutter

### Krok 1: Pobierz Flutter SDK

**Windows:**
1. Pobierz: https://flutter.dev/docs/get-started/install/windows
2. Rozpakuj do `C:\Users\YourUsername\flutter`
3. Dodaj do PATH (Windows):
   - Otwórz System Properties → Environment Variables
   - Dodaj: `C:\Users\YourUsername\flutter\bin`

**macOS:**
```bash
brew install flutter
```

**Linux:**
```bash
git clone https://github.com/flutter/flutter.git -b stable
export PATH="$PATH:`pwd`/flutter/bin"
```

### Krok 2: Zaakceptuj Android licencje

```bash
flutter doctor --android-licenses
# Naciśnij 'y' dla każdej licencji
```

### Krok 3: Sprawdź instalację

```bash
flutter doctor
```

Powinna być zielona lista ✓ dla:
- [✓] Flutter (channel stable)
- [✓] Android toolchain
- [✓] Android Studio

## 🚀 Setup Projektu

### Krok 1: Pobierz/rozpakuj projekt

```bash
# Z ZIP
unzip flutter_app.zip
cd flutter_app

# Lub z Git
git clone <repository-url>
cd flutter_app
```

### Krok 2: Zainstaluj zależności

```bash
# Pobierz pakiety
flutter pub get

# Opcjonalnie: upgrade pakietów
flutter pub upgrade
```

### Krok 3: Sprawdź strukturę

```
flutter_app/
├── lib/
│   ├── main.dart                    ← Punkt wejścia
│   ├── models/recipe.dart           ← Modele
│   ├── providers/recipe_provider.dart ← State management
│   ├── screens/                     ← Ekrany
│   ├── widgets/recipe_card.dart     ← Komponenty
│   └── utils/                       ← Utility (kolory, dane)
├── android/                         ← Konfiguracja Android
├── pubspec.yaml                     ← Zależności
├── QUICKSTART.md                    ← Szybki start
└── README.md
```

## 📲 Uruchamianie Aplikacji

### Opcja A: Emulator Android (ZALECANE)

**Krok 1: Uruchom emulator**
```bash
# Sprawdź dostępne emulatores
flutter emulators

# Uruchom konkretny emulator
flutter emulators --launch Pixel_4_API_30
# lub otwórz Android Studio → AVD Manager
```

**Krok 2: Uruchom aplikację**
```bash
flutter run
```

Powinna się uruchomić aplikacja na emulatorze!

### Opcja B: Fizyczne Urządzenie Android

**Krok 1: Włącz USB Debugging**
1. Otwórz Ustawienia
2. Kliknij "O telefonie"
3. Naciśnij "Build Number" 7 razy
4. Wróć do Ustawienia
5. Opcje deweloperskie → USB Debugging ✓

**Krok 2: Podłącz urządzenie**
```bash
# Sprawdź czy urządzenie jest widoczne
flutter devices

# Powinieneś zobaczyć coś jak:
# 192.168.1.100:5555 • Android Device • android-arm64 • Android 12
```

**Krok 3: Uruchom aplikację**
```bash
flutter run
```

### Hottest Features 🔥

```bash
# Hot Reload (zmień kod, zmień aplikację!)
# W terminalu naciśnij 'r'

# Hot Restart (restart bez stanu)
# Naciśnij 'R'

# Wyświetl logat
flutter logs

# Powrót do menu
# Naciśnij 'q'
```

## ✨ Testowanie Funkcji

### Home Screen
- [ ] Widać listę przepisów
- [ ] Wyszukiwanie działa
- [ ] Filtry po kategorii działają
- [ ] Sortowanie (Najnowsze, Najstarsze, A-Z)
- [ ] Karty się animują

### Szczegóły Receptury
- [ ] Otwiera się po kliknięciu na kartę
- [ ] Wszystkie dane wyświetlają się poprawnie
- [ ] Przycisk Ulubione działa
- [ ] "Dodaj do listy zakupów" działa

### Ulubione
- [ ] Wyświetlają się tylko ulubione
- [ ] Licznik jest poprawny
- [ ] Można usunąć z ulubionych

### Lista Zakupów
- [ ] Składniki się pojawiają
- [ ] Zaznaczanie działa
- [ ] Usuwanie pozycji działa
- [ ] Licznik "do kupienia" się aktualizuje

### Kategorie
- [ ] Wszystkie kategorie wyświetlają się
- [ ] Liczba przepisów jest poprawna
- [ ] Ikony emoji wyświetlają się

### Dodawanie Receptury
- [ ] Formularz otwiera się
- [ ] Można dodać/usunąć pola
- [ ] Walidacja działa
- [ ] Nowy przepis pojawia się na Home

## 📦 Budowanie APK

### Debug APK (na testowanie)
```bash
flutter build apk --debug
# Wyjście: build/app/outputs/flutter-apk/app-debug.apk

# Zainstaluj na urządzeniu
flutter install

# Lub ręcznie
adb install -r build/app/outputs/flutter-apk/app-debug.apk
```

### Release APK (dla produkcji)
```bash
flutter build apk --release
# Wyjście: build/app/outputs/flutter-apk/app-release.apk

# To jest finalna wersja gotowa do dystrybucji
```

### Bundle dla Google Play
```bash
flutter build appbundle --release
# Wyjście: build/app/outputs/bundle/release/app-release.aab
# Prześlij do Google Play Console
```

## 🛠️ Troubleshooting

### Problem: "flutter: command not found"

**Windows (CMD):**
```batch
set PATH=%PATH%;C:\flutter\bin
```

**Windows (PowerShell):**
```powershell
$env:Path += ";C:\flutter\bin"
```

**macOS/Linux:**
```bash
export PATH="$PATH:$HOME/flutter/bin"
# Dodaj do ~/.bashrc lub ~/.zshrc aby był permanentny
```

### Problem: "Android license agreements not accepted"

```bash
flutter doctor --android-licenses
# Akceptuj wszystko (y, Enter)
```

### Problem: "Gradle build failed"

```bash
flutter clean
rm -rf build/
flutter pub get
flutter run
```

### Problem: "Android SDK not found"

```bash
# Sprawdź czy Android Studio jest zainstalowany
flutter doctor -v

# Jeśli nie, zainstaluj Android Studio
# Następnie:
flutter config --android-sdk <path-to-sdk>

# Na Windows domyślnie:
flutter config --android-sdk C:\Users\YourName\AppData\Local\Android\sdk
```

### Problem: "Emulator is too slow"

```bash
# Włącz virtualizację w BIOS (Intel VT-x lub AMD-V)
# Lub użyj fizycznego urządzenia (szybsze)

# Stwórz nowy emulator z więcej RAM
flutter emulators --launch <emulator_id>
```

### Problem: App crashuje przy starcie

```bash
# Sprawdź logat
flutter logs

# Szukaj błędów (errors, exceptions)
# Zazwyczaj problem w main.dart lub initialization

# Full clean & rebuild
flutter clean
flutter pub get
flutter run
```

### Problem: "Hot reload nie działa"

```bash
# Pełny restart
flutter run  # W app naciśnij R

# Jeśli dalej nie działa
flutter run --no-fast-start
```

## 📚 Przydatne Komendy

```bash
# Informacje
flutter --version
flutter doctor -v
flutter devices

# Upgrade
flutter upgrade
flutter pub upgrade

# Czyszczenie
flutter clean
flutter pub cache clean

# Analiza kodu
flutter analyze
flutter format lib/

# Testy
flutter test

# Logat
flutter logs --follow

# Release notes
flutter upgrade --force-upgrade
```

## 🎯 Następne Kroki

Po pomyślnym uruchomieniu:

1. ✅ **Przeglądaj kod** - sprawdź strukturę w `lib/`
2. ✅ **Edytuj ui** - zmień kolory w `lib/utils/colors.dart`
3. ✅ **Dodaj nowe funkcje** - spróbuj dodać ekran
4. ✅ **Przygotuj do publikacji** - podpisz APK i wyślij do Google Play

## 🔗 Recursos

- **Flutter Official**: https://flutter.dev
- **Dart Official**: https://dart.dev
- **Flutter Docs**: https://flutter.dev/docs
- **Material Design**: https://material.io
- **Provider Package**: https://pub.dev/packages/provider
- **SharedPreferences**: https://pub.dev/packages/shared_preferences

## ❓ FAQ

**P: Czy aplikacja działa bez internetu?**
O: Tak! Dane przechowywane są lokalnie (SharedPreferences). Internet potrzebny jest tylko do ładowania obrazów.

**P: Czy mogę modyfikować kod?**
O: Oczywiście! Całe źródła są dostępne. Zaobserwuj zmiany w real-time z hot reload.

**P: Jak mam opublikować na Google Play?**
A: Czytaj instrukcję pod koniec dokumentacji. Musisz: podpisać APK, stworzyć developer account, przesłać bundle.

**P: Czy mogę portować do iOS?**
O: Nie w tym setup. Flutter obsługuje iOS, ale trzeba macOS i Xcode.

---

**Powodzenia! 🚀 Jeśli masz pytania, sprawdzaj logat (`flutter logs`).**
