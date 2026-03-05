import 'package:flutter/foundation.dart';

enum Difficulty {
  łatwy('łatwy'),
  średni('średni'),
  trudny('trudny');

  final String displayName;
  const Difficulty(this.displayName);
}

@immutable
class Recipe {
  final String id;
  final String title;
  final String description;
  final String category;
  final int prepTime;
  final int cookTime;
  final int servings;
  final Difficulty difficulty;
  final List<String> ingredients;
  final List<String> steps;
  final String image;
  final DateTime createdAt;
  final List<String> tags;
  final bool isFavorite;

  const Recipe({
    required this.id,
    required this.title,
    required this.description,
    required this.category,
    required this.prepTime,
    required this.cookTime,
    required this.servings,
    required this.difficulty,
    required this.ingredients,
    required this.steps,
    required this.image,
    required this.createdAt,
    required this.tags,
    required this.isFavorite,
  });

  int get totalTime => prepTime + cookTime;

  Recipe copyWith({
    String? id,
    String? title,
    String? description,
    String? category,
    int? prepTime,
    int? cookTime,
    int? servings,
    Difficulty? difficulty,
    List<String>? ingredients,
    List<String>? steps,
    String? image,
    DateTime? createdAt,
    List<String>? tags,
    bool? isFavorite,
  }) {
    return Recipe(
      id: id ?? this.id,
      title: title ?? this.title,
      description: description ?? this.description,
      category: category ?? this.category,
      prepTime: prepTime ?? this.prepTime,
      cookTime: cookTime ?? this.cookTime,
      servings: servings ?? this.servings,
      difficulty: difficulty ?? this.difficulty,
      ingredients: ingredients ?? this.ingredients,
      steps: steps ?? this.steps,
      image: image ?? this.image,
      createdAt: createdAt ?? this.createdAt,
      tags: tags ?? this.tags,
      isFavorite: isFavorite ?? this.isFavorite,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'category': category,
      'prepTime': prepTime,
      'cookTime': cookTime,
      'servings': servings,
      'difficulty': difficulty.displayName,
      'ingredients': ingredients,
      'steps': steps,
      'image': image,
      'createdAt': createdAt.toIso8601String(),
      'tags': tags,
      'isFavorite': isFavorite,
    };
  }

  factory Recipe.fromJson(Map<String, dynamic> json) {
    return Recipe(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      category: json['category'] ?? '',
      prepTime: json['prepTime'] ?? 0,
      cookTime: json['cookTime'] ?? 0,
      servings: json['servings'] ?? 1,
      difficulty: _parseDifficulty(json['difficulty']),
      ingredients: List<String>.from(json['ingredients'] ?? []),
      steps: List<String>.from(json['steps'] ?? []),
      image: json['image'] ?? '',
      createdAt: DateTime.parse(json['createdAt'] ?? DateTime.now().toIso8601String()),
      tags: List<String>.from(json['tags'] ?? []),
      isFavorite: json['isFavorite'] ?? false,
    );
  }

  static Difficulty _parseDifficulty(String? value) {
    switch (value) {
      case 'łatwy':
        return Difficulty.łatwy;
      case 'średni':
        return Difficulty.średni;
      case 'trudny':
        return Difficulty.trudny;
      default:
        return Difficulty.średni;
    }
  }
}

@immutable
class ShoppingItem {
  final String id;
  final String recipeId;
  final String ingredient;
  final bool isChecked;

  const ShoppingItem({
    required this.id,
    required this.recipeId,
    required this.ingredient,
    required this.isChecked,
  });

  ShoppingItem copyWith({bool? isChecked}) {
    return ShoppingItem(
      id: id,
      recipeId: recipeId,
      ingredient: ingredient,
      isChecked: isChecked ?? this.isChecked,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'recipeId': recipeId,
      'ingredient': ingredient,
      'isChecked': isChecked,
    };
  }

  factory ShoppingItem.fromJson(Map<String, dynamic> json) {
    return ShoppingItem(
      id: json['id'] ?? '',
      recipeId: json['recipeId'] ?? '',
      ingredient: json['ingredient'] ?? '',
      isChecked: json['isChecked'] ?? false,
    );
  }
}
