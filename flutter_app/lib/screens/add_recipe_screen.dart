import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:przepisnik/models/recipe.dart';
import 'package:przepisnik/providers/recipe_provider.dart';
import 'package:przepisnik/utils/colors.dart';

class AddRecipeScreen extends StatefulWidget {
  const AddRecipeScreen({Key? key}) : super(key: key);

  @override
  State<AddRecipeScreen> createState() => _AddRecipeScreenState();
}

class _AddRecipeScreenState extends State<AddRecipeScreen> {
  final _formKey = GlobalKey<FormState>();

  late TextEditingController _titleController;
  late TextEditingController _descriptionController;
  late TextEditingController _imageController;
  late TextEditingController _prepTimeController;
  late TextEditingController _cookTimeController;
  late TextEditingController _servingsController;

  String _selectedCategory = 'Obiad';
  Difficulty _selectedDifficulty = Difficulty.średni;
  List<String> _ingredients = [''];
  List<String> _steps = [''];
  List<String> _tags = [''];

  @override
  void initState() {
    super.initState();
    _titleController = TextEditingController();
    _descriptionController = TextEditingController();
    _imageController = TextEditingController();
    _prepTimeController = TextEditingController();
    _cookTimeController = TextEditingController();
    _servingsController = TextEditingController();
  }

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    _imageController.dispose();
    _prepTimeController.dispose();
    _cookTimeController.dispose();
    _servingsController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final categories = context.read<RecipeProvider>().getCategories();
    final allCategories = ['Wszystkie', 'Śniadanie', 'Obiad', 'Kolacja', 'Zupa', 'Sałatka', 'Deser', 'Przekąska', 'Inne'];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Nowy przepis'),
        elevation: 0,
        backgroundColor: Colors.transparent,
        foregroundColor: AppColors.darkBrown,
      ),
      body: Container(
        decoration: const BoxDecoration(gradient: AppColors.bgGradient),
        child: Form(
          key: _formKey,
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Title
                const Text(
                  'Tytuł',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: AppColors.darkBrown,
                  ),
                ),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _titleController,
                  decoration: InputDecoration(
                    hintText: 'Nazwa przepisu',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  validator: (value) {
                    if (value?.isEmpty ?? true) return 'Wpisz tytuł';
                    return null;
                  },
                ),
                const SizedBox(height: 16),
                // Description
                const Text(
                  'Opis',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: AppColors.darkBrown,
                  ),
                ),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _descriptionController,
                  decoration: InputDecoration(
                    hintText: 'Krótki opis przepisu',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  maxLines: 3,
                  validator: (value) {
                    if (value?.isEmpty ?? true) return 'Wpisz opis';
                    return null;
                  },
                ),
                const SizedBox(height: 16),
                // Category
                const Text(
                  'Kategoria',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: AppColors.darkBrown,
                  ),
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<String>(
                  value: _selectedCategory,
                  items: allCategories
                      .map((cat) => DropdownMenuItem(value: cat, child: Text(cat)))
                      .toList(),
                  onChanged: (value) {
                    setState(() => _selectedCategory = value ?? 'Obiad');
                  },
                  decoration: InputDecoration(
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                // Image URL
                const Text(
                  'Zdjęcie (URL)',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: AppColors.darkBrown,
                  ),
                ),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _imageController,
                  decoration: InputDecoration(
                    hintText: 'https://...',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                // Times
                Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Przygotowanie (min)',
                            style: TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                              color: AppColors.darkBrown,
                            ),
                          ),
                          const SizedBox(height: 8),
                          TextFormField(
                            controller: _prepTimeController,
                            keyboardType: TextInputType.number,
                            decoration: InputDecoration(
                              hintText: '15',
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                            validator: (value) {
                              if (value?.isEmpty ?? true) return 'Wymagane';
                              return null;
                            },
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Gotowanie (min)',
                            style: TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                              color: AppColors.darkBrown,
                            ),
                          ),
                          const SizedBox(height: 8),
                          TextFormField(
                            controller: _cookTimeController,
                            keyboardType: TextInputType.number,
                            decoration: InputDecoration(
                              hintText: '30',
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                            validator: (value) {
                              if (value?.isEmpty ?? true) return 'Wymagane';
                              return null;
                            },
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                // Servings & Difficulty
                Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Porcje',
                            style: TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                              color: AppColors.darkBrown,
                            ),
                          ),
                          const SizedBox(height: 8),
                          TextFormField(
                            controller: _servingsController,
                            keyboardType: TextInputType.number,
                            decoration: InputDecoration(
                              hintText: '4',
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                            validator: (value) {
                              if (value?.isEmpty ?? true) return 'Wymagane';
                              return null;
                            },
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Trudność',
                            style: TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                              color: AppColors.darkBrown,
                            ),
                          ),
                          const SizedBox(height: 8),
                          DropdownButtonFormField<Difficulty>(
                            value: _selectedDifficulty,
                            items: Difficulty.values
                                .map((d) => DropdownMenuItem(
                                      value: d,
                                      child: Text(d.displayName),
                                    ))
                                .toList(),
                            onChanged: (value) {
                              setState(() => _selectedDifficulty = value ?? Difficulty.średni);
                            },
                            decoration: InputDecoration(
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 24),
                // Ingredients
                const Text(
                  'Składniki',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: AppColors.darkBrown,
                  ),
                ),
                const SizedBox(height: 8),
                Column(
                  children: List.generate(_ingredients.length, (index) {
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 8),
                      child: Row(
                        children: [
                          Expanded(
                            child: TextFormField(
                              initialValue: _ingredients[index],
                              decoration: InputDecoration(
                                hintText: 'Składnik ${index + 1}',
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                              ),
                              onChanged: (value) {
                                _ingredients[index] = value;
                              },
                            ),
                          ),
                          const SizedBox(width: 8),
                          if (_ingredients.length > 1)
                            IconButton(
                              icon: const Icon(Icons.remove_circle_outline),
                              onPressed: () {
                                setState(() => _ingredients.removeAt(index));
                              },
                            ),
                        ],
                      ),
                    );
                  }),
                ),
                ElevatedButton.icon(
                  onPressed: () {
                    setState(() => _ingredients.add(''));
                  },
                  icon: const Icon(Icons.add),
                  label: const Text('Dodaj składnik'),
                ),
                const SizedBox(height: 24),
                // Steps
                const Text(
                  'Przygotowanie',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: AppColors.darkBrown,
                  ),
                ),
                const SizedBox(height: 8),
                Column(
                  children: List.generate(_steps.length, (index) {
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 8),
                      child: Row(
                        children: [
                          Expanded(
                            child: TextFormField(
                              initialValue: _steps[index],
                              decoration: InputDecoration(
                                hintText: 'Krok ${index + 1}',
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                              ),
                              maxLines: 2,
                              onChanged: (value) {
                                _steps[index] = value;
                              },
                            ),
                          ),
                          const SizedBox(width: 8),
                          if (_steps.length > 1)
                            IconButton(
                              icon: const Icon(Icons.remove_circle_outline),
                              onPressed: () {
                                setState(() => _steps.removeAt(index));
                              },
                            ),
                        ],
                      ),
                    );
                  }),
                ),
                ElevatedButton.icon(
                  onPressed: () {
                    setState(() => _steps.add(''));
                  },
                  icon: const Icon(Icons.add),
                  label: const Text('Dodaj krok'),
                ),
                const SizedBox(height: 24),
                // Tags
                const Text(
                  'Tagi',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: AppColors.darkBrown,
                  ),
                ),
                const SizedBox(height: 8),
                Column(
                  children: List.generate(_tags.length, (index) {
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 8),
                      child: Row(
                        children: [
                          Expanded(
                            child: TextFormField(
                              initialValue: _tags[index],
                              decoration: InputDecoration(
                                hintText: 'Tag ${index + 1}',
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                              ),
                              onChanged: (value) {
                                _tags[index] = value;
                              },
                            ),
                          ),
                          const SizedBox(width: 8),
                          if (_tags.length > 1)
                            IconButton(
                              icon: const Icon(Icons.remove_circle_outline),
                              onPressed: () {
                                setState(() => _tags.removeAt(index));
                              },
                            ),
                        ],
                      ),
                    );
                  }),
                ),
                ElevatedButton.icon(
                  onPressed: () {
                    setState(() => _tags.add(''));
                  },
                  icon: const Icon(Icons.add),
                  label: const Text('Dodaj tag'),
                ),
                const SizedBox(height: 24),
                // Save button
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _saveRecipe,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.orangeDark,
                      foregroundColor: AppColors.white,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    child: const Text(
                      'Dodaj przepis',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                    ),
                  ),
                ),
                const SizedBox(height: 32),
              ],
            ),
          ),
        ),
      ),
    );
  }

  void _saveRecipe() {
    if (!_formKey.currentState!.validate()) return;

    final recipe = Recipe(
      id: DateTime.now().toString(),
      title: _titleController.text,
      description: _descriptionController.text,
      category: _selectedCategory,
      prepTime: int.tryParse(_prepTimeController.text) ?? 0,
      cookTime: int.tryParse(_cookTimeController.text) ?? 0,
      servings: int.tryParse(_servingsController.text) ?? 1,
      difficulty: _selectedDifficulty,
      ingredients: _ingredients.where((i) => i.isNotEmpty).toList(),
      steps: _steps.where((s) => s.isNotEmpty).toList(),
      image: _imageController.text,
      createdAt: DateTime.now(),
      tags: _tags.where((t) => t.isNotEmpty).toList(),
      isFavorite: false,
    );

    context.read<RecipeProvider>().addRecipe(recipe);

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Przepis dodany pomyślnie!')),
    );

    Navigator.pop(context);
  }
}
