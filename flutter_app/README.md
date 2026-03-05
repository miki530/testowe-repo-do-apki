# Przepiśnik - Aplikacja Flutter

Kompletna aplikacja Flutter do zarządzania przepisami. Przeniesienie z React na Flutter/Dart z zachowaniem stylu i animacji 1:1.

## Struktura projektu

```
flutter_app/
├── lib/
│   ├── main.dart                 # Punkt wejścia aplikacji
│   ├── models/
│   │   └── recipe.dart          # Modele danych (Recipe, ShoppingItem)
│   ├── providers/
│   │   └── recipe_provider.dart  # Zarządzanie stanem (Provider)
│   ├── screens/
│   │   ├── home_screen.dart      # Główny ekran z listą przepisów
│   │   ├── recipe_detail_screen.dart # Szczegóły receptury
│   │   ├── favorites_screen.dart # Ulubione przepisy
│   │   ├── shopping_list_screen.dart # Lista zakupów
│   │   ├── categories_screen.dart # Kategorie
│   │   └── add_recipe_screen.dart # Formularz dodawania
│   ├── widgets/
│   │   └── recipe_card.dart      # Komponent karty receptury
│   └── utils/
│       ├── colors.dart           # Kolory i tema
│       └── sample_data.dart      # Przykładowe przepisy
├── android/                      # Konfiguracja Android
├── pubspec.yaml                  # Zależności Flutter
└── README.md
```

## Wymagania

- Flutter SDK >= 3.0.0
- Dart SDK >= 3.0.0
- Android SDK (dla developmentu na Androidzie)

## Instalacja

### 1. Klonowanie/Rozpakowanie projektu

```bash
# Jeśli pobierasz jako zip
unzip flutter_app.zip
cd flutter_app

# Lub jeśli klonujesz z gita
git clone <repository>
cd flutter_app
```

### 2. Pobranie zależności

```bash
flutter pub get
```

### 3. Uruchomienie aplikacji

**Na emulatorze Android:**
```bash
flutter emulators --launch Pixel_4_API_30  # Lub inny dostępny emulator
flutter run
```

**Na fizycznym urządzeniu:**
```bash
# Podłącz urządzenie USB i włącz developer mode
flutter run
```

**Budowanie APK:**
```bash
flutter build apk --release
# APK będzie w: build/app/outputs/flutter-apk/app-release.apk
```

**Budowanie AAB (dla Google Play):**
```bash
flutter build appbundle --release
# AAB będzie w: build/app/outputs/bundle/release/app-release.aab
```

## Funkcjonalności

### 1. **Home Screen** (`home_screen.dart`)
- Lista wszystkich przepisów
- Wyszukiwanie po nazwie, składniku i tagach
- Filtry po kategorii
- Sortowanie (najnowsze, najstarsze, A-Z)
- Animacje kart przy hover (na urządzeniach z myszką)

### 2. **Szczegóły Receptury** (`recipe_detail_screen.dart`)
- Pełny opis przepisu
- Składniki z możliwością dodania do listy zakupów
- Kroki przygotowania
- Tagi i trudność
- Dodawanie/usuwanie z ulubionych
- Animacje fade-in przy otwarciu

### 3. **Ulubione** (`favorites_screen.dart`)
- Lista ulubionych przepisów
- Szybkie przejście do szczegółów
- Zarządzanie ulubionymi

### 4. **Lista Zakupów** (`shopping_list_screen.dart`)
- Dodawanie składników z receptur
- Zaznaczanie zakupionego
- Usuwanie pozycji
- Wyczyść całą listę
- Licznik pozostałych do kupienia

### 5. **Kategorie** (`categories_screen.dart`)
- Przeglądanie kategorii
- Liczba przepisów w kategorii
- Ikony emoji dla każdej kategorii

### 6. **Dodawanie Receptury** (`add_recipe_screen.dart`)
- Formularz z walidacją
- Dynamiczne dodawanie składników, kroków i tagów
- Wybór kategorii i trudności
- Zapisywanie w pamięci lokalnej

## Zarządzanie Stanem

Projekt używa pakietu **Provider** do zarządzania stanem. Główna klasa:

```dart
RecipeProvider
├── recipes: List<Recipe>           # Lista wszystkich przepisów
├── shoppingList: List<ShoppingItem> # Lista zakupów
├── addRecipe()                     # Dodanie nowego
├── updateRecipe()                  # Aktualizacja
├── deleteRecipe()                  # Usunięcie
├── toggleFavorite()                # Ulubione
├── getFavorites()                  # Pobierz ulubione
├── getCategories()                 # Pobierz kategorie
└── ... (metody dla listy zakupów)
```

## Przechowywanie Danych

Dane przechowywane są lokalnie przy użyciu **SharedPreferences**:
- Przepisy: klucz `przepisnik_recipes`
- Lista zakupów: klucz `przepisnik_shopping_list`

Dane są automatycznie synchronizowane przy każdej zmianie.

## Paleta Kolorów

Wszystkie kolory zachowują oryginalny design z React:

```dart
AppColors.orangeDark    // #ea580c - główny kolor
AppColors.darkBrown     // #1c0a00 - tekst główny
AppColors.lightBrown    // #9e7b6b - tekst pomocniczy
AppColors.bgGradient    // Gradient tła
// ... i wiele więcej (kolory.dart)
```

## Animacje

Projekt zawiera animacje:
- **RecipeCard**: Scale przy hover, shadow effect
- **RecipeDetail**: Fade-in przy otwarciu, smooth transitions
- **Kategorie**: Smooth color transitions
- **Shopping List**: Checkbox animations

## Zależności

```yaml
provider: ^6.0.0              # Zarządzanie stanem
shared_preferences: ^2.2.0    # Przechowywanie lokalne
flutter_svg: ^2.0.0          # Ikony SVG
go_router: ^13.0.0           # Routing (opcjonalnie)
intl: ^0.19.0                # Internacjonalizacja
```

## Troubleshooting

### Problem: "Flutter SDK not found"
```bash
# Ustawianie PATH
export PATH="$PATH:`which flutter`/../bin"
```

### Problem: "Gradle build failed"
```bash
cd android
./gradlew clean
cd ..
flutter clean
flutter pub get
flutter run
```

### Problem: "Emulator nie startuje"
```bash
flutter emulators --launch <emulator_id>
# Sprawdzenie dostępnych emulatorów:
flutter emulators
```

## Pakowanie do Google Play

1. Utwórz klucz keystore:
```bash
keytool -genkey -v -keystore ~/key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key
```

2. Utwórz plik `android/key.properties`:
```properties
storePassword=<hasło>
keyPassword=<hasło>
keyAlias=key
storeFile=<ścieżka do key.jks>
```

3. Buduj signed bundle:
```bash
flutter build appbundle --release
```

## Licencja

Projekt do celów edukacyjnych. Zdjęcia pochodzą z Unsplash.

## Autor

Przeniesienie z React na Flutter - 2024

## Wsparcie

Dokumentacja Flutter: https://flutter.dev/docs
