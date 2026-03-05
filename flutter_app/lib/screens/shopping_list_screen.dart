import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:przepisnik/providers/recipe_provider.dart';
import 'package:przepisnik/utils/colors.dart';

class ShoppingListScreen extends StatelessWidget {
  const ShoppingListScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Lista zakupów'),
        elevation: 0,
        backgroundColor: Colors.transparent,
        foregroundColor: AppColors.darkBrown,
        actions: [
          Consumer<RecipeProvider>(
            builder: (context, provider, _) {
              if (provider.shoppingList.isNotEmpty) {
                return PopupMenuButton(
                  itemBuilder: (context) => [
                    const PopupMenuItem(
                      child: Text('Wyczyść listę'),
                      value: 'clear',
                    ),
                  ],
                  onSelected: (value) {
                    if (value == 'clear') {
                      provider.clearShoppingList();
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Lista wyczyszczona')),
                      );
                    }
                  },
                );
              }
              return const SizedBox();
            },
          ),
        ],
      ),
      body: Container(
        decoration: const BoxDecoration(gradient: AppColors.bgGradient),
        child: Consumer<RecipeProvider>(
          builder: (context, provider, _) {
            if (provider.shoppingList.isEmpty) {
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
                            Icons.shopping_cart_outlined,
                            size: 40,
                            color: AppColors.orangeLight,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    const Text(
                      'Lista zakupów jest pusta',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                        color: AppColors.darkBrown,
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'Dodaj składniki do listy!',
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

            // Group by recipe
            final groupedByRecipe = <String, List<dynamic>>{};
            for (var item in provider.shoppingList) {
              if (!groupedByRecipe.containsKey(item.recipeId)) {
                groupedByRecipe[item.recipeId] = [];
              }
              groupedByRecipe[item.recipeId]!.add(item);
            }

            final uncheckedCount = provider.getUncheckedShoppingCount();

            return SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: AppColors.lightBeige,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      '$uncheckedCount do kupienia',
                      style: const TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: Color(0xFFC2410C),
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: groupedByRecipe.entries.map((entry) {
                      final recipeId = entry.key;
                      final items = entry.value;
                      final recipe = provider.getRecipe(recipeId);

                      return Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          if (recipe != null)
                            Text(
                              recipe.title,
                              style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w600,
                                color: AppColors.darkBrown,
                              ),
                            ),
                          const SizedBox(height: 8),
                          Column(
                            children: items.map((item) {
                              return Padding(
                                padding: const EdgeInsets.only(bottom: 8),
                                child: Row(
                                  children: [
                                    Checkbox(
                                      value: item.isChecked,
                                      onChanged: (_) {
                                        provider.toggleShoppingItem(item.id);
                                      },
                                      activeColor: AppColors.orangeDark,
                                    ),
                                    Expanded(
                                      child: Text(
                                        item.ingredient,
                                        style: TextStyle(
                                          fontSize: 14,
                                          fontWeight: FontWeight.w400,
                                          color: item.isChecked
                                              ? AppColors.lightBrown
                                              : AppColors.darkBrown,
                                          decoration: item.isChecked
                                              ? TextDecoration.lineThrough
                                              : TextDecoration.none,
                                        ),
                                      ),
                                    ),
                                    IconButton(
                                      icon: const Icon(Icons.close),
                                      iconSize: 18,
                                      color: AppColors.lightBrown,
                                      onPressed: () {
                                        provider.removeShoppingItem(item.id);
                                      },
                                    ),
                                  ],
                                ),
                              );
                            }).toList(),
                          ),
                          const SizedBox(height: 16),
                        ],
                      );
                    }).toList(),
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
