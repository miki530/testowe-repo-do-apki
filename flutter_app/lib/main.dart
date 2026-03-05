import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:przepisnik/providers/recipe_provider.dart';
import 'package:przepisnik/utils/colors.dart';
import 'package:przepisnik/screens/home_screen.dart';
import 'package:przepisnik/screens/favorites_screen.dart';
import 'package:przepisnik/screens/shopping_list_screen.dart';
import 'package:przepisnik/screens/categories_screen.dart';
import 'package:przepisnik/screens/recipe_detail_screen.dart';
import 'package:przepisnik/screens/add_recipe_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final recipeProvider = RecipeProvider();
  await recipeProvider.initialize();
  
  runApp(
    ChangeNotifierProvider<RecipeProvider>.value(
      value: recipeProvider,
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Przepiśnik',
      theme: AppTheme.lightTheme,
      home: const MainScreen(),
      routes: {
        '/favorites': (context) => const FavoritesScreen(),
        '/shopping-list': (context) => const ShoppingListScreen(),
        '/categories': (context) => const CategoriesScreen(),
        '/add': (context) => const AddRecipeScreen(),
      },
      onGenerateRoute: (settings) {
        if (settings.name?.startsWith('/recipe/') ?? false) {
          final recipeId = settings.name!.split('/').last;
          return MaterialPageRoute(
            builder: (context) => RecipeDetailScreen(recipeId: recipeId),
            settings: settings,
          );
        }
        return null;
      },
    );
  }
}

class MainScreen extends StatefulWidget {
  const MainScreen({Key? key}) : super(key: key);

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(gradient: AppColors.bgGradient),
        child: const HomeScreen(),
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (int index) {
          setState(() => _currentIndex = index);
          
          switch (index) {
            case 0:
              // Home
              break;
            case 1:
              Navigator.of(context).pushNamed('/favorites');
              break;
            case 2:
              Navigator.of(context).pushNamed('/shopping-list');
              break;
            case 3:
              Navigator.of(context).pushNamed('/categories');
              break;
          }
        },
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.home_outlined),
            selectedIcon: Icon(Icons.home),
            label: 'Wszystkie',
          ),
          NavigationDestination(
            icon: Icon(Icons.favorite_outline),
            selectedIcon: Icon(Icons.favorite),
            label: 'Ulubione',
          ),
          NavigationDestination(
            icon: Icon(Icons.shopping_cart_outlined),
            selectedIcon: Icon(Icons.shopping_cart),
            label: 'Zakupy',
          ),
          NavigationDestination(
            icon: Icon(Icons.category_outlined),
            selectedIcon: Icon(Icons.category),
            label: 'Kategorie',
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        onPressed: () => Navigator.of(context).pushNamed('/add'),
        child: const Icon(Icons.add),
      ),
    );
  }
}
