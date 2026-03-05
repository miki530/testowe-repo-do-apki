import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:przepisnik/providers/recipe_provider.dart';
import 'package:przepisnik/utils/colors.dart';
import 'package:przepisnik/utils/sample_data.dart';

class CategoriesScreen extends StatelessWidget {
  const CategoriesScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Kategorie'),
        elevation: 0,
        backgroundColor: Colors.transparent,
        foregroundColor: AppColors.darkBrown,
      ),
      body: Container(
        decoration: const BoxDecoration(gradient: AppColors.bgGradient),
        child: Consumer<RecipeProvider>(
          builder: (context, provider, _) {
            final categories = provider.getCategories();

            if (categories.isEmpty) {
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
                            Icons.category_outlined,
                            size: 40,
                            color: AppColors.orangeLight,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    const Text(
                      'Brak kategorii',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                        color: AppColors.darkBrown,
                      ),
                    ),
                  ],
                ),
              );
            }

            return ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: categories.length,
              itemBuilder: (context, index) {
                final category = categories[index];
                final recipesInCategory = provider.recipes
                    .where((r) => r.category == category)
                    .toList();

                return GestureDetector(
                  onTap: () {
                    Navigator.pop(context);
                    // Filter would be applied in HomeScreen
                  },
                  child: Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    elevation: 0,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                      side: const BorderSide(
                        color: AppColors.borderOrange,
                        width: 1,
                      ),
                    ),
                    color: AppColors.white,
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Row(
                        children: [
                          Container(
                            width: 56,
                            height: 56,
                            decoration: const BoxDecoration(
                              gradient: AppColors.gradient,
                              borderRadius: BorderRadius.all(
                                Radius.circular(12),
                              ),
                            ),
                            child: Center(
                              child: Text(
                                getCategoryEmoji(category),
                                style: const TextStyle(fontSize: 28),
                              ),
                            ),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  category,
                                  style: const TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.w600,
                                    color: AppColors.darkBrown,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  '${recipesInCategory.length} przepisów',
                                  style: const TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.w400,
                                    color: AppColors.lightBrown,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const Icon(Icons.arrow_forward_ios, size: 16, color: AppColors.lightBrown),
                        ],
                      ),
                    ),
                  ),
                );
              },
            );
          },
        ),
      ),
    );
  }
}
