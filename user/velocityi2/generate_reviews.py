import json
import random

# Your original source review phrases used to build unique permutations
source_reviews = {
    'PCB Design': {
        'English': [
            'Very satisfied with the PCB design quality.', 'The board was optimized, reliable, and delivered on schedule.',
            'Velocity delivered a high-quality PCB design that worked perfectly in the first prototype.', 'Great support throughout the project.',
            'Professional PCB design service with excellent attention to detail and manufacturing-ready files.',
            'Outstanding PCB design expertise and quick communication.', 'Looking forward to future projects.',
            'The PCB layout was clean, robust, and fully ready for manufacturing with no rework needed.'
        ],
        'Gujarati': [
            'PCB design quality bada maatra ma saras hato.', 'board manufacturing mate ekdam ready hato.',
            'Velocity ni team low-noise PCB design ane tight layout par perfect dhyan aape che.',
            'Design clean ane manufacturing ready files saathe aavyu.', 'Koi rework ni jarur nathi padi.',
            'Project time par complete thayo ane communication pan badhu supportiv hato.',
            'Prototype ma board first try ma saro perform karyo.', 'Service professional ane efficient hasti.'
        ],
        'Hindi': [
            'PCB design bahut accha tha aur board manufacturing ke liye bilkul ready tha.',
            'Velocity ne high-quality PCB design diya jo first prototype me perfect chala.',
            'Design clean tha aur manufacturing-ready files ke saath delivered hua.',
            'Project time par complete hua aur team ki communication bahut supportive thi.',
            'Prototype me board first attempt me acha perform kiya.', 'Service professional aur efficient thi.'
        ]
    },
    'Hardware Design': {
        'English': [
            'Excellent hardware design service with innovative solutions and professional engineering support.',
            'The hardware design was reliable, efficient, and perfectly matched our project requirements.',
            'Great experience working with Velocity on our hardware development project.', 'Professional and knowledgeable team.',
            'High-quality hardware design with excellent component selection and system integration.',
            'Professional hardware development service with strong technical expertise and timely delivery.'
        ],
        'Gujarati': [
            'Hardware design service bahut professional ane practical hato.', 'Solution modern ane reliable hato.',
            'Design component selection saari hti ane system integration pan perfectly work karyu.',
            'Velocity ni team knowledgeable ane responsive hatu.', 'badha questions jhatpat answer karya.',
            'Project requirement ne dhyan ma rakhi ne hardware design efficient ane cost-effective banavyu.',
            'Delivery time par thai gayi ane testing support pan strong hati.'
        ],
        'Hindi': [
            'Hardware design service bahut professional thi aur solution reliable tha.',
            'Component selection acchi thi aur system integration bilkul theek se kaam kiya.',
            'Velocity ki team responsive thi aur technical questions ka jaldi jawab diya.',
            'Design hamare project requirements ke hisab se efficient aur practical bana.',
            'Delivery time par hui aur testing support bhi strong thi.'
        ]
    },
    'Firmware': {
        'English': [
            'Excellent firmware development service with stable performance and clean implementation.',
            'Velocity provided reliable firmware development and quickly resolved all technical requirements.',
            'Professional embedded firmware development with excellent optimization and support.',
            'The firmware was delivered on time and performed exactly as expected.', 'Highly recommended.',
            'Outstanding firmware engineering service with strong technical knowledge and great communication.'
        ],
        'Gujarati': [
            'Firmware development bahut stable htu ane device smoothly chale.',
            'Technical requirement ne team jhatpat solve kari ane bug fix pan regular aavyo.',
            'Optimization saari hati ane code implementation clean htu.',
            'Firmware time par delivered thayi ane expectation pramane perfect chalti hati.',
            'Communication strong hati ane support process smooth hto.'
        ],
        'Hindi': [
            'Firmware development bahut stable thi aur device smoothly chal raha tha.',
            'Technical requirements ko Velocity team ne jaldi se solve kiya aur bugs fix kiye.',
            'Optimization achhi thi aur code implementation clean thi.',
            'Firmware time par deliver hui aur expectation ke mutabik perfect kaam kiya.',
            'Communication strong thi aur support process smooth tha.'
        ]
    },
    'Product Development': {
        'English': [
            'Velocity successfully handled our complete product development from concept to final prototype.', 'Excellent experience.',
            'Professional end-to-end product development service including hardware, firmware, and testing support.',
            'Excellent product development partner with strong technical expertise and innovative solutions.',
            'The team transformed our idea into a fully functional product with exceptional quality and support.',
            'Outstanding product development service with professional project management and timely delivery.'
        ],
        'Gujarati': [
            'Product development process smoothly chali ane final prototype pan excellent htu.',
            'End-to-end service ma hardware, firmware ane testing support cover thayu.',
            'Velocity ni team innovative solutions aapi ane product idea ne practical product ma convert karyu.',
            'Project management professional hati ane delivery time par thayi.',
            'Support ane communication transparent hati, jemne pura trust male.'
        ],
        'Hindi': [
            'Product development process smoothly chala aur final prototype bahut accha tha.',
            'End-to-end service me hardware, firmware aur testing support sab cover hua.',
            'Velocity ki team ne innovative solutions diye aur idea ko practical product me badla.',
            'Project management professional tha aur delivery time par hui.',
            'Support aur communication transparent thi, jisse bharosa bana raha.'
        ]
    },
    'Product Purchase': {
        'English': [
            'Purchased a product from Velocity and the quality exceeded expectations.', 'Excellent support and service.',
            'Great product quality, fast delivery, and professional customer support.', 'Highly recommended.',
            'Very satisfied with the product performance and overall buying experience.',
            'Excellent product with reliable performance and great value for money.',
            'Professional service and quality products.', 'The purchase process was smooth and hassle-free.'
        ],
        'Gujarati': [
            'Product quality expectations karta vadhu hati ane delivery pan fast hati.',
            'Customer support professional hati ane purchase process completely smooth hati.',
            'Product performance ekdam reliable hati ane overall experience saras hati.',
            'Quality product ane value for money pan excellent hati.',
            'Service friendly ane hassle-free hati, badhu easy rite complete thayu.'
        ],
        'Hindi': [
            'Product quality expectations se better thi aur delivery fast thi.',
            'Customer support professional tha aur purchase process bilkul smooth tha.',
            'Product performance reliable thi aur overall experience accha raha.',
            'Quality product aur value for money dono achhe the.',
            'Service friendly thi aur purchase bilkul hassle-free tha.'
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
        reviews_generated_for_this_combo = 0
        attempts = 0
        max_attempts = reviews_per_lang_per_topic * 20
        
        while reviews_generated_for_this_combo < reviews_per_lang_per_topic and attempts < max_attempts:
            attempts += 1
            
            # Randomly select 1 to 2 phrases to keep review size 20-40 words
            num_phrases = min(random.randint(1, 2), len(phrases))
            chosen_phrases = random.sample(phrases, k=num_phrases)
            simulated_review = " ".join(chosen_phrases)
            
            # Count words and check if within 20-40 word limit
            word_count = len(simulated_review.split())
            
            # Ensure the generated review is unique and within word limit
            if word_count >= 20 and word_count <= 40 and simulated_review not in output_data[category][lang]:
                output_data[category][lang].append(simulated_review)
                reviews_generated_for_this_combo += 1
                generated_count += 1
        
        print(f"  {category} ({lang}): {reviews_generated_for_this_combo} reviews")

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

