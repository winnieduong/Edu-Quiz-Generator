import fitz  # PyMuPDF
import docx
import openai
import sys

def extract_text_from_pdf(file_path):
    text = ""
    with fitz.open(file_path) as doc:
        for page in doc:
            text += page.get_text()
    return text

def extract_text_from_docx(file_path):
    doc = docx.Document(file_path)
    text = "\n".join([para.text for para in doc.paragraphs])
    return text

def generate_quiz(content):
    # Set your OpenAI API key
    openai.api_key = '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'
    prompt = f"Create a quiz from the following text:\n\n{content}"
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=500
    )
    return response.choices[0].text.strip()

if __name__ == "__main__":
    file_path = sys.argv[1]
    if file_path.endswith(".pdf"):
        content = extract_text_from_pdf(file_path)
    elif file_path.endswith(".docx"):
        content = extract_text_from_docx(file_path)
    else:
        raise ValueError("Unsupported file format")
    
    quiz = generate_quiz(content)
    print(quiz)
