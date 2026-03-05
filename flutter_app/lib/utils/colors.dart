import 'package:flutter/material.dart';

class AppColors {
  // Primary gradient
  static const gradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [Color(0xFFF97316), Color(0xFFea580c)],
  );

  // Background
  static const bgGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [Color(0xFFFEF7EE), Color(0xFFFFF8F0)],
  );

  // Text colors
  static const darkBrown = Color(0xFF1c0a00);
  static const mediumBrown = Color(0xFF7c3d12);
  static const lightBrown = Color(0xFF9e7b6b);
  
  // UI colors
  static const white = Color(0xFFFFFFFF);
  static const lightBeige = Color(0xFFFEF3E2);
  static const orange = Color(0xFFf97316);
  static const orangeDark = Color(0xFFea580c);
  static const orangeLight = Color(0xFFfdba74);
  
  // Border & background
  static const borderOrange = Color(0xFFfed7aa);
  static const bgOrange = Color(0xFFfff0e6);

  // Difficulty colors
  static const easyGreen = Color(0xFF16a34a);
  static const mediumOrange = Color(0xFFd97706);
  static const hardRed = Color(0xFFdc2626);

  // Difficulty backgrounds
  static const easyBgGreen = Color(0xFFF0FDF4);
  static const mediumBgOrange = Color(0xFFFFFBEB);
  static const hardBgRed = Color(0xFFFEF2F2);

  // Favorites
  static const favoriteRed = Color(0xFFef4444);
  static const favoriteGray = Color(0xFFcbd5e1);

  // Shadow
  static const shadowColor = Color(0xFF000000);
}

class AppTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      scaffoldBackgroundColor: AppColors.white,
      appBarTheme: const AppBarTheme(
        backgroundColor: Color(0xFFFFFFFF),
        elevation: 0,
        surfaceTintColor: Color(0xFFFFFFFF),
        foregroundColor: AppColors.darkBrown,
      ),
      floatingActionButtonTheme: FloatingActionButtonThemeData(
        backgroundColor: AppColors.orangeDark,
        foregroundColor: AppColors.white,
        elevation: 4,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      ),
      inputDecorationTheme: InputDecorationTheme(
        fillColor: AppColors.white,
        filled: true,
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
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        hintStyle: const TextStyle(color: AppColors.lightBrown),
      ),
      chipTheme: ChipThemeData(
        backgroundColor: AppColors.white,
        labelStyle: const TextStyle(color: AppColors.mediumBrown),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: const BorderSide(color: AppColors.borderOrange),
        ),
        side: const BorderSide(color: AppColors.borderOrange),
      ),
      textTheme: const TextTheme(
        displayLarge: TextStyle(
          fontSize: 32,
          fontWeight: FontWeight.w600,
          color: AppColors.darkBrown,
        ),
        displayMedium: TextStyle(
          fontSize: 28,
          fontWeight: FontWeight.w600,
          color: AppColors.darkBrown,
        ),
        titleLarge: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: AppColors.darkBrown,
        ),
        titleMedium: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w600,
          color: AppColors.darkBrown,
        ),
        bodyLarge: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w400,
          color: AppColors.darkBrown,
        ),
        bodyMedium: TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w400,
          color: AppColors.lightBrown,
        ),
        bodySmall: TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.w400,
          color: AppColors.lightBrown,
        ),
        labelLarge: TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w600,
          color: AppColors.darkBrown,
        ),
      ),
    );
  }
}
