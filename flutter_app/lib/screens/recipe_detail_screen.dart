import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:przepisnik/providers/recipe_provider.dart';
import 'package:przepisnik/utils/colors.dart';
import 'package:przepisnik/utils/sample_data.dart';

class RecipeDetailScreen extends StatefulWidget {
  final String recipeId;

  const RecipeDetailScreen({
    Key? key,
    required this.recipeId,
  }) : super(key: key);

  @override
  State<RecipeDetailScreen> createState() => _RecipeDetailScreenState();
}

class _RecipeDetailScreenState extends State<RecipeDetailScreen> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 400),
      vsync: this,
    );
    _fadeAnimation = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeIn),
    );
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<RecipeProvider>(
      builder: (context, provider, _) {
        final recipe = provider.getRecipe(widget.recipeId);

        if (recipe == null) {
          return Scaffold(
            appBar: AppBar(title: const Text('Receptura nie znaleziona')),
            body: const Center(child: Text('Receptura nie istnieje')),
          );
        }

        return Scaffold(
          body: Container(
            decoration: const BoxDecoration(gradient: AppColors.bgGradient),
            child: CustomScrollView(
              slivers: [
                // App bar
                SliverAppBar(
                  expandedHeight: 200,
                  pinned: true,
                  backgroundColor: Colors.transparent,
                  elevation: 0,
                  leading: Container(
                    margin: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: AppColors.white.withOpacity(0.92),
                      borderRadius: BorderRadius.circular(12),
                      backdropFilter: const ImageFilter.blur(sigmaX: 4, sigmaY: 4),
                    ),
                    child: IconButton(
                      icon: const Icon(Icons.arrow_back, color: AppColors.darkBrown),
                      onPressed: () => Navigator.pop(context),
                    ),
                  ),
                  actions: [
                    Container(
                      margin: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: AppColors.white.withOpacity(0.92),
                        borderRadius: BorderRadius.circular(12),
                        backdropFilter: const ImageFilter.blur(sigmaX: 4, sigmaY: 4),
                      ),
                      child: IconButton(
                        icon: Icon(
                          recipe.isFavorite ? Icons.favorite : Icons.favorite_outline,
                          color: recipe.isFavorite ? AppColors.favoriteRed : AppColors.favoriteGray,
                        ),
                        onPressed: () => provider.toggleFavorite(recipe.id),
                      ),
                    ),
                  ],
                  flexibleSpace: FlexibleSpaceBar(
                    background: Stack(
                      fit: StackFit.expand,
                      children: [
                        if (recipe.image.isNotEmpty)
                          Image.network(
                            recipe.image,
                            fit: BoxFit.cover,
                          )
                        else
                          Container(
                            color: AppColors.lightBeige,
                            child: const Center(
                              child: Icon(
                                Icons.restaurant,
                                size: 64,
                                color: AppColors.orangeLight,
                              ),
                            ),
                          ),
                      ],
                    ),
                  ),
                ),
                // Content
                SliverToBoxAdapter(
                  child: FadeTransition(
                    opacity: _fadeAnimation,
                    child: Container(
                      margin: const EdgeInsets.only(top: 16),
                      decoration: const BoxDecoration(
                        color: AppColors.white,
                        borderRadius: BorderRadius.vertical(
                          top: Radius.circular(24),
                        ),
                      ),
                      padding: const EdgeInsets.all(20),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // Title and category
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      recipe.title,
                                      style: const TextStyle(
                                        fontSize: 24,
                                        fontWeight: FontWeight.w600,
                                        color: AppColors.darkBrown,
                                      ),
                                    ),
                                    const SizedBox(height: 8),
                                    Container(
                                      padding: const EdgeInsets.symmetric(
                                        horizontal: 12,
                                        vertical: 6,
                                      ),
                                      decoration: BoxDecoration(
                                        color: AppColors.lightBeige,
                                        borderRadius: BorderRadius.circular(20),
                                      ),
                                      child: Text(
                                        '${getCategoryEmoji(recipe.category)} ${recipe.category}',
                                        style: const TextStyle(
                                          fontSize: 12,
                                          fontWeight: FontWeight.w600,
                                          color: AppColors.mediumBrown,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 16),
                          // Description
                          Text(
                            recipe.description,
                            style: const TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w400,
                              color: AppColors.lightBrown,
                            ),
                          ),
                          const SizedBox(height: 20),
                          // Stats row
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              _buildStatCard(
                                icon: Icons.schedule,
                                label: 'Czas',
                                value: '${recipe.totalTime} min',
                              ),
                              _buildStatCard(
                                icon: Icons.people,
                                label: 'Porcje',
                                value: '${recipe.servings} os.',
                              ),
                              _buildStatCard(
                                icon: Icons.auto_awesome,
                                label: 'Trudność',
                                value: recipe.difficulty.displayName,
                                color: getDifficultyColor(recipe.difficulty),
                                bgColor: getDifficultyBgColor(recipe.difficulty),
                              ),
                            ],
                          ),
                          const SizedBox(height: 24),
                          // Ingredients
                          const Text(
                            'Składniki',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.w600,
                              color: AppColors.darkBrown,
                            ),
                          ),
                          const SizedBox(height: 12),
                          Column(
                            children: recipe.ingredients.map((ingredient) {
                              return Padding(
                                padding: const EdgeInsets.only(bottom: 8),
                                child: Row(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Container(
                                      width: 4,
                                      height: 4,
                                      margin: const EdgeInsets.only(top: 6, right: 12),
                                      decoration: BoxDecoration(
                                        color: AppColors.orangeDark,
                                        borderRadius: BorderRadius.circular(2),
                                      ),
                                    ),
                                    Expanded(
                                      child: Text(
                                        ingredient,
                                        style: const TextStyle(
                                          fontSize: 14,
                                          fontWeight: FontWeight.w400,
                                          color: AppColors.darkBrown,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              );
                            }).toList(),
                          ),
                          const SizedBox(height: 24),
                          // Add to shopping list button
                          SizedBox(
                            width: double.infinity,
                            child: ElevatedButton.icon(
                              onPressed: () {
                                provider.addIngredientsToShoppingList(
                                  recipe.id,
                                  recipe.ingredients,
                                );
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(
                                    content: Text('Składniki dodane do listy zakupów'),
                                  ),
                                );
                              },
                              icon: const Icon(Icons.shopping_cart),
                              label: const Text('Dodaj do listy zakupów'),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: AppColors.orangeDark,
                                foregroundColor: AppColors.white,
                                padding: const EdgeInsets.symmetric(vertical: 12),
                              ),
                            ),
                          ),
                          const SizedBox(height: 24),
                          // Steps
                          const Text(
                            'Przygotowanie',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.w600,
                              color: AppColors.darkBrown,
                            ),
                          ),
                          const SizedBox(height: 12),
                          Column(
                            children: List.generate(recipe.steps.length, (index) {
                              return Padding(
                                padding: const EdgeInsets.only(bottom: 12),
                                child: Row(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Container(
                                      width: 32,
                                      height: 32,
                                      decoration: const BoxDecoration(
                                        gradient: AppColors.gradient,
                                        shape: BoxShape.circle,
                                      ),
                                      child: Center(
                                        child: Text(
                                          '${index + 1}',
                                          style: const TextStyle(
                                            fontSize: 14,
                                            fontWeight: FontWeight.w600,
                                            color: AppColors.white,
                                          ),
                                        ),
                                      ),
                                    ),
                                    const SizedBox(width: 12),
                                    Expanded(
                                      child: Text(
                                        recipe.steps[index],
                                        style: const TextStyle(
                                          fontSize: 14,
                                          fontWeight: FontWeight.w400,
                                          color: AppColors.darkBrown,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              );
                            }),
                          ),
                          const SizedBox(height: 24),
                          // Tags
                          if (recipe.tags.isNotEmpty)
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'Tagi',
                                  style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.w600,
                                    color: AppColors.darkBrown,
                                  ),
                                ),
                                const SizedBox(height: 12),
                                Wrap(
                                  spacing: 8,
                                  runSpacing: 8,
                                  children: recipe.tags
                                      .map((tag) => Container(
                                            padding: const EdgeInsets.symmetric(
                                              horizontal: 12,
                                              vertical: 6,
                                            ),
                                            decoration: BoxDecoration(
                                              color: AppColors.lightBeige,
                                              borderRadius: BorderRadius.circular(20),
                                            ),
                                            child: Text(
                                              '#$tag',
                                              style: const TextStyle(
                                                fontSize: 12,
                                                fontWeight: FontWeight.w600,
                                                color: Color(0xFFC2410C),
                                              ),
                                            ),
                                          ))
                                      .toList(),
                                ),
                              ],
                            ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildStatCard({
    required IconData icon,
    required String label,
    required String value,
    Color? color,
    Color? bgColor,
  }) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: bgColor ?? AppColors.lightBeige,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          children: [
            Icon(icon, size: 20, color: color ?? AppColors.orangeLight),
            const SizedBox(height: 4),
            Text(
              label,
              style: const TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w400,
                color: AppColors.lightBrown,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              value,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: color ?? AppColors.darkBrown,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

import 'dart:ui';
