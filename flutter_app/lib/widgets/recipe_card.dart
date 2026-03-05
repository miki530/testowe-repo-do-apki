import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:przepisnik/models/recipe.dart';
import 'package:przepisnik/providers/recipe_provider.dart';
import 'package:przepisnik/utils/colors.dart';
import 'package:przepisnik/utils/sample_data.dart';

class RecipeCard extends StatefulWidget {
  final Recipe recipe;
  final VoidCallback onTap;

  const RecipeCard({
    Key? key,
    required this.recipe,
    required this.onTap,
  }) : super(key: key);

  @override
  State<RecipeCard> createState() => _RecipeCardState();
}

class _RecipeCardState extends State<RecipeCard> with SingleTickerProviderStateMixin {
  late AnimationController _hoverController;
  late Animation<double> _hoverAnimation;

  @override
  void initState() {
    super.initState();
    _hoverController = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );
    _hoverAnimation = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _hoverController, curve: Curves.easeOut),
    );
  }

  @override
  void dispose() {
    _hoverController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => _hoverController.forward(),
      onExit: (_) => _hoverController.reverse(),
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedBuilder(
          animation: _hoverAnimation,
          builder: (context, child) {
            return Transform.translate(
              offset: Offset(0, -2 * _hoverAnimation.value),
              child: Container(
                decoration: BoxDecoration(
                  color: AppColors.white,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: const Color(0xFFfed7aa),
                    width: 1,
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: AppColors.shadowColor.withOpacity(0.08),
                      blurRadius: 8 * (0.5 + _hoverAnimation.value),
                      offset: Offset(0, 2 + 2 * _hoverAnimation.value),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Image with category badge and favorite button
                    Stack(
                      children: [
                        ClipRRect(
                          borderRadius: const BorderRadius.vertical(
                            top: Radius.circular(20),
                          ),
                          child: AnimatedBuilder(
                            animation: _hoverAnimation,
                            builder: (context, child) {
                              return Transform.scale(
                                scale: 1 + 0.05 * _hoverAnimation.value,
                                alignment: Alignment.center,
                                child: widget.recipe.image.isNotEmpty
                                    ? Image.network(
                                        widget.recipe.image,
                                        height: 180,
                                        width: double.infinity,
                                        fit: BoxFit.cover,
                                      )
                                    : Container(
                                        height: 180,
                                        color: AppColors.lightBeige,
                                        child: const Center(
                                          child: Icon(
                                            Icons.restaurant,
                                            size: 48,
                                            color: AppColors.orangeLight,
                                          ),
                                        ),
                                      ),
                              );
                            },
                          ),
                        ),
                        // Category badge
                        Positioned(
                          top: 12,
                          left: 12,
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(
                              color: AppColors.white.withOpacity(0.92),
                              borderRadius: BorderRadius.circular(20),
                              backdropFilter: const ImageFilter.blur(sigmaX: 4, sigmaY: 4),
                            ),
                            child: Text(
                              '${getCategoryEmoji(widget.recipe.category)} ${widget.recipe.category}',
                              style: const TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.w600,
                                color: AppColors.mediumBrown,
                              ),
                            ),
                          ),
                        ),
                        // Favorite button
                        Positioned(
                          top: 12,
                          right: 12,
                          child: Consumer<RecipeProvider>(
                            builder: (context, provider, _) {
                              return GestureDetector(
                                onTap: () {
                                  provider.toggleFavorite(widget.recipe.id);
                                },
                                child: TweenAnimationBuilder<double>(
                                  tween: Tween(
                                    begin: widget.recipe.isFavorite ? 1.0 : 0.0,
                                    end: widget.recipe.isFavorite ? 1.0 : 0.0,
                                  ),
                                  duration: const Duration(milliseconds: 150),
                                  builder: (context, value, child) {
                                    return Container(
                                      width: 32,
                                      height: 32,
                                      decoration: BoxDecoration(
                                        color: AppColors.white.withOpacity(0.92),
                                        borderRadius: BorderRadius.circular(16),
                                        backdropFilter: const ImageFilter.blur(sigmaX: 4, sigmaY: 4),
                                      ),
                                      child: Icon(
                                        widget.recipe.isFavorite
                                            ? Icons.favorite
                                            : Icons.favorite_outline,
                                        size: 16,
                                        color: widget.recipe.isFavorite
                                            ? AppColors.favoriteRed
                                            : AppColors.favoriteGray,
                                      ),
                                    );
                                  },
                                ),
                              );
                            },
                          ),
                        ),
                      ],
                    ),
                    // Content
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            // Title
                            Text(
                              widget.recipe.title,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w500,
                                color: AppColors.darkBrown,
                              ),
                            ),
                            const SizedBox(height: 4),
                            // Description
                            Text(
                              widget.recipe.description,
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.w400,
                                color: AppColors.lightBrown,
                              ),
                            ),
                            const Spacer(),
                            // Meta row
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Expanded(
                                  child: Row(
                                    children: [
                                      const Icon(Icons.schedule, size: 14, color: AppColors.lightBrown),
                                      const SizedBox(width: 4),
                                      Text(
                                        '${widget.recipe.totalTime} min',
                                        style: const TextStyle(
                                          fontSize: 12,
                                          fontWeight: FontWeight.w400,
                                          color: AppColors.lightBrown,
                                        ),
                                      ),
                                      const SizedBox(width: 16),
                                      const Icon(Icons.people, size: 14, color: AppColors.lightBrown),
                                      const SizedBox(width: 4),
                                      Text(
                                        '${widget.recipe.servings} os.',
                                        style: const TextStyle(
                                          fontSize: 12,
                                          fontWeight: FontWeight.w400,
                                          color: AppColors.lightBrown,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                  decoration: BoxDecoration(
                                    color: getDifficultyBgColor(widget.recipe.difficulty),
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                  child: Text(
                                    widget.recipe.difficulty.displayName,
                                    style: TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.w600,
                                      color: getDifficultyColor(widget.recipe.difficulty),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            // Tags
                            if (widget.recipe.tags.isNotEmpty)
                              Padding(
                                padding: const EdgeInsets.only(top: 12),
                                child: Wrap(
                                  spacing: 4,
                                  children: widget.recipe.tags
                                      .take(3)
                                      .map((tag) => Container(
                                            padding: const EdgeInsets.symmetric(
                                              horizontal: 8,
                                              vertical: 4,
                                            ),
                                            decoration: BoxDecoration(
                                              color: AppColors.lightBeige,
                                              borderRadius: BorderRadius.circular(12),
                                            ),
                                            child: Text(
                                              '#$tag',
                                              style: const TextStyle(
                                                fontSize: 12,
                                                fontWeight: FontWeight.w400,
                                                color: Color(0xFFC2410C),
                                              ),
                                            ),
                                          ))
                                      .toList(),
                                ),
                              ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}

import 'dart:ui';
