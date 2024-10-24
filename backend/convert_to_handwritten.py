import sys
from PIL import Image, ImageDraw, ImageFont

def convert_to_handwriting(text, style):
    # Create a blank image with a white background
    image_width = 800  # Adjust width as needed
    image_height = 400  # Adjust height as needed based on text
    background_color = (255, 255, 255)  # White background
    text_color = (0, 0, 0)  # Black text color

    # Create a blank image and a drawing object
    image = Image.new('RGB', (image_width, image_height), background_color)
    draw = ImageDraw.Draw(image)

    # Load the font based on the provided style
    if style == 'cursive':
        font_path = 'fonts/CursiveFont.ttf'  # Make sure this font exists in the "fonts" directory
    else:
        font_path = 'fonts/DefaultFont.ttf'  # Default font if no style is provided

    # Load the font with a specific size
    try:
        font = ImageFont.truetype(font_path, 50)  # Font size 50, adjust as needed
    except OSError:
        print("Font file not found")
        return None

    # Draw the text on the image
    draw.text((50, 50), text, font=font, fill=text_color)  # (50, 50) is the position to start drawing

    return image

if __name__ == '__main__':
    text = sys.argv[1]
    handwriting_style = sys.argv[2]

    # Generate the image with the handwritten text
    output_image = convert_to_handwriting(text, handwriting_style)

    if output_image:
        # Save the image to the "images" directory
        output_image.save('images/handwritten_text.png')
        print("handwritten_text.png")  # Output the image filename so it can be sent back to the frontend
    else:
        print("Error generating handwritten image")
