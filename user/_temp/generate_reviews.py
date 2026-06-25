import json
import random
import itertools

# Your original source review phrases used to build unique permutations
source_reviews = {
    'PCB Design': {
        'English': [
            
        ],
        'Gujarati': [
            
        ],
        'Hindi': [
            
        ]
    },
    'Hardware Design': {
        'English': [
            
        ],
        'Gujarati': [
            
        ],
        'Hindi': [
            
        ]
    },
    'Firmware': {
        'English': [
            
        ],
        'Gujarati': [
            
        ],
        'Hindi': [
            
        ]
    },
    'Product Development': {
        'English': [
            
        ],
        'Gujarati': [
            
        ],
        'Hindi': [
            
        ]
    },
    'Product Purchase': {
        'English': [
            
        ],
        'Gujarati': [
            
        ],
        'Hindi': [
            
        ]
    }
}

try:
    # Ask the user for reviews per language
    user_input = input("How many reviews per language per topic do you want to generate? ")
    reviews_per_lang_per_topic = int(user_input)
except ValueError:
    print("Invalid input. Defaulting to 100 reviews per language per topic.")
    reviews_per_lang_per_topic = 100

# Initialize empty structure identical to your desired output file
output_data = {}
categories = list(source_reviews.keys())
languages = ['English', 'Gujarati', 'Hindi']

for category in categories:
    output_data[category] = {}
    for lang in languages:
        output_data[category][lang] = []

# Calculate totals for reporting
total_per_language = reviews_per_lang_per_topic * len(categories)
total_all = total_per_language * len(languages)

print(f"\nGenerating {reviews_per_lang_per_topic} reviews per topic per language...")
print(f"Topics: {len(categories)}")
print(f"Languages: {len(languages)}")
print(f"Per language total: {total_per_language} reviews")
print(f"Grand total: {total_all} reviews\n")

generated_count = 0

# Generate for each category and language combination
for category in categories:
    for lang in languages:
        phrases = source_reviews[category][lang]
        min_words = 2
        max_words = 15
        max_phrase_count = min(5, len(phrases))
        generated_reviews = []
        unique_reviews = set()

        def is_valid_review(text):
            wc = len(text.split())
            return min_words <= wc <= max_words

        # Always include all original full phrases first
        for phrase in phrases:
            if is_valid_review(phrase):
                if phrase not in unique_reviews:
                    unique_reviews.add(phrase)
                    generated_reviews.append(phrase)

        # Add full-phrase combinations until we have enough unique candidates
        for phrase_count in range(2, max_phrase_count + 1):
            for combo in itertools.product(phrases, repeat=phrase_count):
                review = " ".join(combo)
                if is_valid_review(review) and review not in unique_reviews:
                    unique_reviews.add(review)
                    generated_reviews.append(review)
                    if len(generated_reviews) >= reviews_per_lang_per_topic:
                        break
            if len(generated_reviews) >= reviews_per_lang_per_topic:
                break

        # If there are not enough unique whole-phrase reviews, fill by repeating whole-phrase sequences
        attempt = 0
        while len(generated_reviews) < reviews_per_lang_per_topic and attempt < reviews_per_lang_per_topic * 10:
            attempt += 1
            phrase_count = random.randint(1, max_phrase_count)
            combo = [random.choice(phrases) for _ in range(phrase_count)]
            review = " ".join(combo)
            if is_valid_review(review):
                generated_reviews.append(review)

        if len(generated_reviews) < reviews_per_lang_per_topic:
            print(f"  {category} ({lang}): only {len(generated_reviews)} reviews generated. Add more source phrases or reduce the request.")
        else:
            generated_reviews = generated_reviews[:reviews_per_lang_per_topic]

        output_data[category][lang] = generated_reviews
        generated_count += len(generated_reviews)
        print(f"  {category} ({lang}): {len(generated_reviews)} reviews")

# Write to json file matching your requested format
with open('reviews.json', 'w', encoding='utf-8') as f:
    json.dump(output_data, f, indent=2, ensure_ascii=False)

print(f"\n✅ Success! Generated and saved {generated_count} reviews to 'reviews.json'.")
print(f"\nBreakdown:")
print(f"  Topics: {len(categories)}")
print(f"  Languages: {len(languages)}")
print(f"  Per topic per language: {reviews_per_lang_per_topic}")
print(f"  Total per language: {total_per_language}")
print(f"  Grand total: {total_all}")

