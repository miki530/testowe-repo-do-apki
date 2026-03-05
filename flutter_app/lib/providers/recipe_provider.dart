import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:przepisnik/models/recipe.dart';
import 'package:przepisnik/utils/sample_data.dart';

class RecipeProvider extends ChangeNotifier {
  static const String _storageKey = 'przepisnik_recipes';
  static const String _shoppingListKey = 'przepisnik_shopping_list';

  List<Recipe> _recipes = [];
  List<ShoppingItem> _shoppingList = [];
  late SharedPreferences _prefs;

  List<Recipe> get recipes => _recipes;
  List<ShoppingItem> get shoppingList => _shoppingList;

  Future<void> initialize() async {
    _prefs = await SharedPreferences.getInstance();
    await _loadRecipes();
    await _loadShoppingList();
  }

  Future<void> _loadRecipes() async {
    final stored = _prefs.getString(_storageKey);
    if (stored != null) {
      try {
        final List<dynamic> jsonList = jsonDecode(stored);
        _recipes = jsonList.map((item) => Recipe.fromJson(item as Map<String, dynamic>)).toList();
      } catch (e) {
        print('Error loading recipes: $e');
        _recipes = getSampleRecipes();
        await _saveRecipes();
      }
    } else {
      _recipes = getSampleRecipes();
      await _saveRecipes();
    }
    notifyListeners();
  }

  Future<void> _saveRecipes() async {
    try {
      final jsonList = _recipes.map((recipe) => recipe.toJson()).toList();
      await _prefs.setString(_storageKey, jsonEncode(jsonList));
    } catch (e) {
      print('Error saving recipes: $e');
    }
  }

  Future<void> _loadShoppingList() async {
    final stored = _prefs.getString(_shoppingListKey);
    if (stored != null) {
      try {
        final List<dynamic> jsonList = jsonDecode(stored);
        _shoppingList = jsonList.map((item) => ShoppingItem.fromJson(item as Map<String, dynamic>)).toList();
      } catch (e) {
        print('Error loading shopping list: $e');
      }
    }
    notifyListeners();
  }

  Future<void> _saveShoppingList() async {
    try {
      final jsonList = _shoppingList.map((item) => item.toJson()).toList();
      await _prefs.setString(_shoppingListKey, jsonEncode(jsonList));
    } catch (e) {
      print('Error saving shopping list: $e');
    }
  }

  void addRecipe(Recipe recipe) {
    final newRecipe = recipe.copyWith(
      id: DateTime.now().toString(),
      createdAt: DateTime.now(),
    );
    _recipes.insert(0, newRecipe);
    _saveRecipes();
    notifyListeners();
  }

  void updateRecipe(Recipe recipe) {
    final index = _recipes.indexWhere((r) => r.id == recipe.id);
    if (index != -1) {
      _recipes[index] = recipe;
      _saveRecipes();
      notifyListeners();
    }
  }

  void deleteRecipe(String id) {
    _recipes.removeWhere((r) => r.id == id);
    _shoppingList.removeWhere((item) => item.recipeId == id);
    _saveRecipes();
    _saveShoppingList();
    notifyListeners();
  }

  void toggleFavorite(String id) {
    final index = _recipes.indexWhere((r) => r.id == id);
    if (index != -1) {
      _recipes[index] = _recipes[index].copyWith(isFavorite: !_recipes[index].isFavorite);
      _saveRecipes();
      notifyListeners();
    }
  }

  Recipe? getRecipe(String id) {
    try {
      return _recipes.firstWhere((r) => r.id == id);
    } catch (e) {
      return null;
    }
  }

  List<Recipe> getFavorites() {
    return _recipes.where((r) => r.isFavorite).toList();
  }

  List<String> getCategories() {
    final categories = <String>{};
    for (var recipe in _recipes) {
      categories.add(recipe.category);
    }
    return categories.toList()..sort();
  }

  void addIngredientsToShoppingList(String recipeId, List<String> ingredients) {
    for (var ingredient in ingredients) {
      final id = '${recipeId}_${DateTime.now().millisecond}_${ingredient.hashCode}';
      _shoppingList.add(
        ShoppingItem(
          id: id,
          recipeId: recipeId,
          ingredient: ingredient,
          isChecked: false,
        ),
      );
    }
    _saveShoppingList();
    notifyListeners();
  }

  void toggleShoppingItem(String itemId) {
    final index = _shoppingList.indexWhere((item) => item.id == itemId);
    if (index != -1) {
      _shoppingList[index] = _shoppingList[index].copyWith(isChecked: !_shoppingList[index].isChecked);
      _saveShoppingList();
      notifyListeners();
    }
  }

  void removeShoppingItem(String itemId) {
    _shoppingList.removeWhere((item) => item.id == itemId);
    _saveShoppingList();
    notifyListeners();
  }

  void clearShoppingList() {
    _shoppingList.clear();
    _saveShoppingList();
    notifyListeners();
  }

  int getUncheckedShoppingCount() {
    return _shoppingList.where((item) => !item.isChecked).length;
  }
}
