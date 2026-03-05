# Przepiśnik - Szybki Start

Przewodnik krok po kroku do uruchomienia aplikacji Flutter na Androidzie.

## 1. Wymagania wstępne

### Windows:
- Flutter SDK: https://flutter.dev/docs/get-started/install/windows
- Android Studio: https://developer.android.com/studio
- JDK 11+

### macOS:
```bash
brew install flutter
```

### Linux:
```bash
sudo snap install flutter --classic
```

## 2. Weryfikacja instalacji

```bash
flutter doctor
```

Powinna być zielona lista. Jeśli nie, zainstaluj brakujące komponenty (Android SDK, emulator, itp.)

## 3. Klonowanie/Rozpakowanie projektu

### Opcja A: Rozpakowanie z ZIP
```bash
unzip przepisnik_flutter.zip
cd flutter_app
```

### Opcja B: Z Git
```bash
git clone <URL>
cd flutter_app
```

## 4. Zainstalowanie zależności

```bash
flutter pub get
```

## 5. Uruchomienie aplikacji

### Opcja A: Na emulatorze Android (REKOMENDOWANA)

1. Otwórz Android Studio
2. Idź do: Tools → AVD Manager
3. Stwórz lub uruchom emulator (Pixel 4 z Android 12+)
4. W terminalu:
```bash
flutter run
```

### Opcja B: Na fizycznym urządzeniu

1. Włącz Developer Mode na urządzeniu:
   - Ustawienia → O telefonie → Naciśnij Build Number 7x
   - Wróć → Developer Options → Włącz USB Debugging

2. Podłącz urządzenie USB kablem

3. Sprawdź czy jest widoczne:
```bash
flutter devices
```

4. Uruchom:
```bash
flutter run
```

## 6. Budowanie APK na Androida

```bash
# Debug APK (na testowanie)
flutter build apk --debug

# Release APK (dla produkcji)
flutter build apk --release
```

APK będzie w: `build/app/outputs/flutter-apk/`

## 7. Struktura aplikacji

- **lib/main.dart** - punkt wejścia
- **lib/screens/** - ekrany aplikacji
- **lib/models/** - modele danych
- **lib/providers/** - zarządzanie stanem
- **lib/widgets/** - komponenty UI
- **lib/utils/** - kolory, dane, helpy

## 8. Funkcjonalności do przetestowania

✅ **Home Screen**
- [x] Lista przepisów
- [x] Wyszukiwanie
- [x] Filtry kategorii
- [x] Sortowanie

✅ **Szczegóły Receptury**
- [x] Pełne info o przepisie
- [x] Dodawanie do ulubionych
- [x] Dodawanie do listy zakupów

✅ **Ulubione**
- [x] Lista ulubionych

✅ **Lista Zakupów**
- [x] Zaznaczanie pozycji
- [x] Usuwanie pozycji

✅ **Kategorie**
- [x] Przeglądanie kategorii

✅ **Dodawanie Receptury**
- [x] Formularz z walidacją
- [x] Dynamiczne pola

## 9. Rozwiązywanie problemów

### Problem: "flutter: command not found"
```bash
# Dodaj do PATH (Windows - Command Prompt):
set PATH=%PATH%;C:\Users\YourUsername\flutter\bin

# lub (macOS/Linux):
export PATH="$PATH:$HOME/flutter/bin"
```

### Problem: "Android license agreements not accepted"
```bash
flutter doctor --android-licenses
# Akceptuj wszystkie (y)
```

### Problem: "Gradle build failed"
```bash
flutter clean
flutter pub get
flutter run
```

### Problem: "Emulator nie startuje"
```bash
# Sprawdź listę emulatorów
flutter emulators

# Uruchom konkretny
flutter emulators --launch <emulator_id>

# Jeśli dalej nie działa, usuń i stwórz nowy w Android Studio
```

### Problem: "App się crashuje przy starcie"
1. Sprawdź logcat: `flutter logs`
2. Upewnij się że SharedPreferences jest zainicjalizowana
3. Sprawdź czy Android minSdkVersion ≥ 21

## 10. Edytowanie kodu

Rekomendowane edytory:
- **Android Studio** (pełny feature set)
- **VS Code** (lekszy, szybszy)
- **IntelliJ IDEA**

Zainstaluj rozszerzenie Flutter dla swojego edytora.

## 11. Debugowanie

### Hot Reload (zmiana kodu bez restartu)
```bash
flutter run
# W terminalu naciśnij 'r' by reload
# Naciśnij 'R' by full restart
```

### Logowanie
```dart
print('Debug: $variable');
debugPrint('Debug: $variable');
```

### DevTools (inspektor)
```bash
flutter pub global activate devtools
flutter pub global run devtools
```

## 12. Deployment

### Publiczna wersja dla Google Play:

1. Utwórz Google Play Developer Account
2. Podpisz aplikację:
```bash
keytool -genkey -v -keystore ~/key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 -alias key
```

3. Buduj signed APK/Bundle:
```bash
flutter build appbundle --release
```

4. Prześlij do Google Play Console

## 13. Przydatne komendy

```bash
# Sprawdzenie wersji
flutter --version

# Upgrade Flutter
flutter upgrade

# Lista dostępnych urządzeń
flutter devices

# Informacje diagnostyczne
flutter doctor -v

# Analiza kodu
flutter analyze

# Uruchamianie testów
flutter test

# Format kodu
flutter format lib/

# Sprzątanie buildów
flutter clean
```

## 14. Struktura katalogów po klonoowaniu

```
flutter_app/
├── android/              # Konfiguracja Android
├── build/               # Wyniki buildów (ignoruj)
├── lib/                 # Kod źródłowy
│   ├── main.dart
│   ├── models/
│   ├── providers/
│   ├── screens/
│   ├── widgets/
│   └── utils/
├── test/                # Testy
├── pubspec.yaml         # Zależności
├── pubspec.lock         # Locked versions
├── README.md
├── QUICKSTART.md        # Ten plik
└── analysis_options.yaml
```

## 15. Następne kroki

Po zainstalowaniu:

1. ✅ Uruchom aplikację
2. ✅ Przetestuj wszystkie ekrany
3. ✅ Spróbuj dodać własny przepis
4. ✅ Sprawdź listę zakupów
5. ✅ Edytuj kod w `lib/` i zobacz zmiany na żywo (Hot Reload)

## Potrzebna pomoc?

- Flutter Docs: https://flutter.dev/docs
- Dart Docs: https://dart.dev/guides
- Stack Overflow: tag `flutter`
- GitHub Issues: https://github.com/flutter/flutter/issues

---

**Powodzenia z Przepisnikiem! 🍳**
