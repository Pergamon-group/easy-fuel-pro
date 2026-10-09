from rembg import remove
from PIL import Image
import os

input_dir = 'public/res'
output_dir = 'public/res'

files_to_process = [
    'Logo 1.png',
    'EasyFuel Pro logo.jpg',
    'EasyFuel Pro logo (1).jpg'
]

for filename in files_to_process:
    input_path = os.path.join(input_dir, filename)
    output_path = os.path.join(output_dir, f"{os.path.splitext(filename)[0]}_transparent.png")
    
    if os.path.exists(input_path):
        print(f"Processing {filename}...")
        try:
            input_image = Image.open(input_path)
            output_image = remove(input_image)
            output_image.save(output_path)
            print(f"Saved to {output_path}")
        except Exception as e:
            print(f"Failed to process {filename}: {e}")
    else:
        print(f"File {filename} not found.")
