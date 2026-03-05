import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:przepisnik/providers/recipe_provider.dart';
import 'package:przepisnik/utils/colors.dart';
import 'package:przepisnik/widgets/recipe_card.dart';
import 'package:przepisnik/screens/recipe_detail_screen.dart';

class FavoritesScreen extends StatelessWidget {
  const FavoritesScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Ulubione'),
        elevation: 0,
        backgroundColor: Colors.transparent,
        foregroundColor: AppColors.darkBrown,
      ),
      body: Container(
        decoration: const BoxDecoration(gradient: AppColors.bgGradient),
        child: Consumer<RecipeProvider>(
          builder: (context, provider, _) {
            final favorites = provider.getFavorites();

            if (favorites.isEmpty) {
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
                            Icons.favorite_outline,
                            size: 40,
                            color: AppColors.orangeLight,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    const Text(
                      'Brak ulubionych',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                        color: AppColors.darkBrown,
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'Dodaj przepisy do ulubionych!',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w400,
                        color: AppColors.lightBrown,
                      ),
                    ),
                  ],
                ),
              );
            }

            return SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 8),
                  Text(
                    '${favorites.length} ulubionych',
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      color: AppColors.mediumBrown,
                    ),
                  ),
                  const SizedBox(height: 12),
                  GridView.builder(
                    physics: const NeverScrollableScrollPhysics(),
                    shrinkWrap: true,
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 1,
                      childAspectRatio: 0.75,
                      mainAxisSpacing: 20,
                    ),
                    itemCount: favorites.length,
                    itemBuilder: (context, index) {
                      return RecipeCard(
                        recipe: favorites[index],
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => RecipeDetailScreen(
                                recipeId: favorites[index].id,
                              ),
                            ),
                          );
                        },
                      );
                    },
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}
