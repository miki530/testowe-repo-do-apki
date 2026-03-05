import 'package:przepisnik/models/recipe.dart';

List<Recipe> getSampleRecipes() {
  return [
    Recipe(
      id: '1',
      title: 'Spaghetti Bolognese',
      description: 'Klasyczne włoskie spaghetti z mięsnym sosem bolońskim. Aromatyczne, sycące danie idealne na rodzinny obiad.',
      category: 'Obiad',
      prepTime: 15,
      cookTime: 45,
      servings: 4,
      difficulty: Difficulty.średni,
      image: 'https://images.unsplash.com/photo-1604367285668-73d5dea642de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      ingredients: [
        '400g spaghetti',
        '500g mielonego mięsa wołowego',
        '1 cebula',
        '2 ząbki czosnku',
        '400g passaty pomidorowej',
        '2 łyżki oliwy z oliwek',
        'sól, pieprz do smaku',
        'bazylia świeża',
        '50g parmezanu',
      ],
      steps: [
        'Ugotuj spaghetti al dente zgodnie z instrukcją na opakowaniu.',
        'Na rozgrzanej oliwie podsmaż posiekaną cebulę i czosnek przez 3-4 minuty.',
        'Dodaj mięso mielone i smaż do zrumienienia, rozbijając grudki.',
        'Wlej passatę, dopraw solą i pieprzem. Gotuj na wolnym ogniu 30 minut.',
        'Podaj sos na spaghetti, posyp parmezanem i świeżą bazylią.',
      ],
      createdAt: DateTime(2024, 1, 15, 10, 0),
      tags: ['włoskie', 'pasta', 'mięso'],
      isFavorite: true,
    ),
    Recipe(
      id: '2',
      title: 'Zupa pomidorowa',
      description: 'Tradycyjna polska zupa pomidorowa z ryżem. Kremowa, rozgrzewająca i pełna smaku.',
      category: 'Zupa',
      prepTime: 10,
      cookTime: 30,
      servings: 6,
      difficulty: Difficulty.łatwy,
      image: 'https://images.unsplash.com/photo-1620416328738-dae3168e6890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      ingredients: [
        '1,5l bulionu drobiowego',
        '400g passaty pomidorowej',
        '3 łyżki koncentratu pomidorowego',
        '200ml śmietany 18%',
        '100g ryżu',
        'sól, cukier do smaku',
        'bazylia, oregano',
        '1 marchewka',
        '1 pietruszka',
      ],
      steps: [
        'W garnku podgrzej bulion z marchewką i pietruszką.',
        'Dodaj passatę i koncentrat pomidorowy, wymieszaj.',
        'Wsyp ryż i gotuj 20 minut na wolnym ogniu.',
        'Wlej śmietanę, dopraw solą i cukrem do smaku.',
        'Podgrzewaj jeszcze 5 minut, podaj z pieczywem.',
      ],
      createdAt: DateTime(2024, 1, 20, 14, 0),
      tags: ['polska', 'zupa', 'wegetariańska'],
      isFavorite: false,
    ),
    Recipe(
      id: '3',
      title: 'Ciasto czekoladowe',
      description: 'Wilgotne i intensywnie czekoladowe ciasto. Idealne na każdą okazję – proste w przygotowaniu, a niesamowite w smaku.',
      category: 'Deser',
      prepTime: 20,
      cookTime: 40,
      servings: 8,
      difficulty: Difficulty.średni,
      image: 'https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      ingredients: [
        '200g ciemnej czekolady',
        '150g masła',
        '150g cukru',
        '3 jajka',
        '100g mąki',
        '2 łyżki kakao',
        '1 łyżeczka proszku do pieczenia',
        'szczypta soli',
        '100ml śmietany do dekoracji',
      ],
      steps: [
        'Roztop czekoladę z masłem w kąpieli wodnej lub mikrofalówce.',
        'Ubij jajka z cukrem na puszystą masę.',
        'Połącz czekoladę z jajkami, dodaj przesianą mąkę, kakao i proszek.',
        'Przelej do formy wyłożonej papierem, piecz w 180°C przez 35-40 minut.',
        'Ostudź, udekoruj bitą śmietaną i kawałkami czekolady.',
      ],
      createdAt: DateTime(2024, 2, 1, 16, 0),
      tags: ['czekolada', 'ciasto', 'deser'],
      isFavorite: true,
    ),
    Recipe(
      id: '4',
      title: 'Sałatka z grillowanym kurczakiem',
      description: 'Lekka i sycąca sałatka z soczyście grillowanym kurczakiem, świeżymi warzywami i dressingiem cytrynowym.',
      category: 'Sałatka',
      prepTime: 20,
      cookTime: 15,
      servings: 2,
      difficulty: Difficulty.łatwy,
      image: 'https://images.unsplash.com/photo-1760888549075-0b9727e07735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      ingredients: [
        '2 piersi z kurczaka',
        '150g mieszanki sałat',
        '1 awokado',
        '200g pomidorków koktajlowych',
        '1 ogórek',
        '3 łyżki oliwy z oliwek',
        'sok z 1 cytryny',
        'sól, pieprz, czosnek granulowany',
        '50g parmezanu w wiórach',
      ],
      steps: [
        'Kurczaka marynuj w oliwie, soku z cytryny i przyprawach przez 15 minut.',
        'Grilluj na rozgrzanej patelni grillowej po 6-7 minut z każdej strony.',
        'Pokrój kurczaka w plastry, awokado w kostkę, ogórek w półplasterki.',
        'Wymieszaj dressing z oliwy, soku z cytryny, soli i pieprzu.',
        'Ułóż sałatę, warzywa, kurczaka, polej dressingiem i posyp parmezanem.',
      ],
      createdAt: DateTime(2024, 2, 10, 12, 0),
      tags: ['zdrowe', 'kurczak', 'fit'],
      isFavorite: false,
    ),
    Recipe(
      id: '5',
      title: 'Naleśniki z dżemem',
      description: 'Puchate i cienkie naleśniki – klasyczne śniadanie lub deser. Podawane z dżemem, śmietaną lub owocami.',
      category: 'Śniadanie',
      prepTime: 10,
      cookTime: 20,
      servings: 4,
      difficulty: Difficulty.łatwy,
      image: 'https://images.unsplash.com/photo-1739897091734-0f4af03cace2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      ingredients: [
        '2 jajka',
        '500ml mleka',
        '200g mąki pszennej',
        '1 łyżka cukru',
        'szczypta soli',
        '2 łyżki masła (do smażenia)',
        'dżem truskawkowy do podania',
        'cukier puder do posypania',
      ],
      steps: [
        'Zmiksuj jajka z mlekiem, dodaj przesianą mąkę, cukier i sól.',
        'Miksuj do uzyskania gładkiego, rzadkiego ciasta bez grudek.',
        'Odstaw ciasto na 15-20 minut.',
        'Na rozgrzanej, lekko natłuszczonej patelni smaż cienkie naleśniki po ok. 1 minucie z każdej strony.',
        'Podawaj z dżemem, owinięte lub złożone w trójkąt, posypane cukrem pudrem.',
      ],
      createdAt: DateTime(2024, 2, 15, 8, 0),
      tags: ['śniadanie', 'szybkie', 'słodkie'],
      isFavorite: false,
    ),
  ];
}

String getCategoryEmoji(String category) {
  switch (category.toLowerCase()) {
    case 'śniadanie':
      return '🌅';
    case 'obiad':
      return '🍽️';
    case 'kolacja':
      return '🌙';
    case 'zupa':
      return '🍲';
    case 'sałatka':
      return '🥗';
    case 'deser':
      return '🍰';
    case 'przekąska':
      return '🍪';
    default:
      return '📝';
  }
}

Color getDifficultyColor(Difficulty difficulty) {
  switch (difficulty) {
    case Difficulty.łatwy:
      return const Color(0xFF16a34a);
    case Difficulty.średni:
      return const Color(0xFFd97706);
    case Difficulty.trudny:
      return const Color(0xFFdc2626);
  }
}

Color getDifficultyBgColor(Difficulty difficulty) {
  switch (difficulty) {
    case Difficulty.łatwy:
      return const Color(0xFFF0FDF4);
    case Difficulty.średni:
      return const Color(0xFFFFFBEB);
    case Difficulty.trudny:
      return const Color(0xFFFEF2F2);
  }
}

import 'package:flutter/material.dart';
