import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:przepisnik/providers/recipe_provider.dart';
import 'package:przepisnik/utils/colors.dart';
import 'package:przepisnik/widgets/recipe_card.dart';
import 'package:przepisnik/utils/sample_data.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String _searchQuery = '';
  String _selectedCategory = 'Wszystkie';
  String _sortBy = 'newest';

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header with spacing
          Padding(
            padding: const EdgeInsets.only(top: 16, left: 16, right: 16, bottom: 8),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Twoje przepisy',
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.w600,
                            color: AppColors.darkBrown,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Przeglądaj, szukaj i gotuj!',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w400,
                            color: AppColors.lightBrown,
                          ),
                        ),
                      ],
                    ),
                    Consumer<RecipeProvider>(
                      builder: (context, provider, _) {
                        return Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                          decoration: BoxDecoration(
                            color: AppColors.lightBeige,
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text(
                            '${provider.recipes.length} przepisów',
                            style: const TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w600,
                              color: Color(0xFFC2410C),
                            ),
                          ),
                        );
                      },
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          // Search & Sort
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Column(
              children: [
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        onChanged: (value) => setState(() => _searchQuery = value),
                        decoration: InputDecoration(
                          hintText: 'Szukaj przepisu, składnika...',
                          hintStyle: const TextStyle(color: AppColors.lightBrown),
                          prefixIcon: const Icon(Icons.search, color: AppColors.orangeLight),
                          suffixIcon: _searchQuery.isNotEmpty
                              ? GestureDetector(
                                  onTap: () => setState(() => _searchQuery = ''),
                                  child: const Icon(Icons.close, color: AppColors.lightBrown),
                                )
                              : null,
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: const BorderSide(color: AppColors.borderOrange),
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: const BorderSide(color: AppColors.borderOrange),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: const BorderSide(color: AppColors.orangeDark, width: 2),
                          ),
                          contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                        ),
                        style: const TextStyle(color: AppColors.darkBrown),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                      decoration: BoxDecoration(
                        border: Border.all(color: AppColors.borderOrange),
                        borderRadius: BorderRadius.circular(12),
                        color: AppColors.white,
                      ),
                      child: DropdownButton<String>(
                        value: _sortBy,
                        underline: const SizedBox(),
                        isDense: true,
                        items: const [
                          DropdownMenuItem(value: 'newest', child: Text('Najnowsze')),
                          DropdownMenuItem(value: 'oldest', child: Text('Najstarsze')),
                          DropdownMenuItem(value: 'az', child: Text('A–Z')),
                        ],
                        onChanged: (value) => setState(() => _sortBy = value ?? 'newest'),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                // Category chips
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Consumer<RecipeProvider>(
                    builder: (context, provider, _) {
                      final categories = ['Wszystkie', ...provider.getCategories()];
                      return Row(
                        children: categories.map((category) {
                          final isSelected = _selectedCategory == category;
                          return Padding(
                            padding: const EdgeInsets.only(right: 8),
                            child: GestureDetector(
                              onTap: () => setState(() => _selectedCategory = category),
                              child: AnimatedContainer(
                                duration: const Duration(milliseconds: 200),
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                                decoration: BoxDecoration(
                                  gradient: isSelected ? const LinearGradient(
                                    colors: [Color(0xFFF97316), Color(0xFFea580c)],
                                  ) : null,
                                  color: isSelected ? null : AppColors.white,
                                  border: isSelected
                                      ? null
                                      : Border.all(color: AppColors.borderOrange),
                                  borderRadius: BorderRadius.circular(20),
                                  boxShadow: isSelected
                                      ? [
                                          BoxShadow(
                                            color: const Color(0xFFF97316).withOpacity(0.3),
                                            blurRadius: 8,
                                            offset: const Offset(0, 2),
                                          ),
                                        ]
                                      : null,
                                ),
                                child: Text(
                                  category,
                                  style: TextStyle(
                                    fontSize: 14,
                                    fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
                                    color: isSelected ? AppColors.white : AppColors.mediumBrown,
                                  ),
                                ),
                              ),
                            ),
                          );
                        }).toList(),
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
          // Recipes grid
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Consumer<RecipeProvider>(
              builder: (context, provider, _) {
                var recipes = provider.recipes;

                // Filter
                if (_searchQuery.isNotEmpty) {
                  final q = _searchQuery.toLowerCase();
                  recipes = recipes.where((r) {
                    return r.title.toLowerCase().contains(q) ||
                        r.description.toLowerCase().contains(q) ||
                        r.tags.any((t) => t.toLowerCase().contains(q)) ||
                        r.ingredients.any((i) => i.toLowerCase().contains(q));
                  }).toList();
                }

                if (_selectedCategory != 'Wszystkie') {
                  recipes = recipes.where((r) => r.category == _selectedCategory).toList();
                }

                // Sort
                if (_sortBy == 'newest') {
                  recipes.sort((a, b) => b.createdAt.compareTo(a.createdAt));
                } else if (_sortBy == 'oldest') {
                  recipes.sort((a, b) => a.createdAt.compareTo(b.createdAt));
                } else if (_sortBy == 'az') {
                  recipes.sort((a, b) => a.title.compareTo(b.title));
                }

                if (recipes.isEmpty) {
                  return Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        SizedBox(
                          width: 80,
                          height: 80,
                          child: Container(
                            decoration: BoxDecoration(
                              color: AppColors.lightBeige,
                              borderRadius: BorderRadius.circular(24),
                            ),
                            child: const Center(
                              child: Icon(
                                Icons.restaurant,
                                size: 40,
                                color: AppColors.orangeLight,
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 16),
                        if (_searchQuery.isNotEmpty || _selectedCategory != 'Wszystkie')
                          Column(
                            children: [
                              const Text(
                                'Brak wyników',
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.w600,
                                  color: AppColors.darkBrown,
                                ),
                              ),
                              const SizedBox(height: 8),
                              Text(
                                'Nie znaleziono przepisów pasujących do wyszukiwania.',
                                textAlign: TextAlign.center,
                                style: const TextStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.w400,
                                  color: AppColors.lightBrown,
                                ),
                              ),
                              const SizedBox(height: 16),
                              ElevatedButton.icon(
                                onPressed: () {
                                  setState(() {
                                    _searchQuery = '';
                                    _selectedCategory = 'Wszystkie';
                                  });
                                },
                                icon: const Icon(Icons.clear),
                                label: const Text('Wyczyść filtry'),
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: AppColors.orangeDark,
                                  foregroundColor: AppColors.white,
                                ),
                              ),
                            ],
                          )
                        else
                          Column(
                            children: [
                              const Text(
                                'Brak przepisów',
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.w600,
                                  color: AppColors.darkBrown,
                                ),
                              ),
                              const SizedBox(height: 8),
                              const Text(
                                'Dodaj swój pierwszy przepis!',
                                style: TextStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.w400,
                                  color: AppColors.lightBrown,
                                ),
                              ),
                            ],
                          ),
                      ],
                    ),
                  );
                }

                return GridView.builder(
                  physics: const NeverScrollableScrollPhysics(),
                  shrinkWrap: true,
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 1,
                    childAspectRatio: 0.75,
                    mainAxisSpacing: 20,
                  ),
                  itemCount: recipes.length,
                  itemBuilder: (context, index) {
                    return RecipeCard(
                      recipe: recipes[index],
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => RecipeDetailScreen(
                              recipeId: recipes[index].id,
                            ),
                          ),
                        );
                      },
                    );
                  },
                );
              },
            ),
          ),
          const SizedBox(height: 32),
        ],
      ),
    );
  }
}

import 'package:przepisnik/screens/recipe_detail_screen.dart';
