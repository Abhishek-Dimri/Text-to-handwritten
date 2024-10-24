import sys

def convert_to_handwriting(text, style):
    # Your handwriting conversion logic here
    return f"Converted text: {text} with style: {style}"

if __name__ == '__main__':
    text = sys.argv[1]
    handwriting_style = sys.argv[2]
    converted_text = convert_to_handwriting(text, handwriting_style)
    print(converted_text)
