# Selectance

A backend and frontend friendly way to make multiple option selection in your HTML forms built in an easy to use way.

[![Status](https://img.shields.io/badge/status-active-success.svg)](Status)
[![GitHub Issues](https://img.shields.io/github/issues/JeanKouss/selectance.svg)](https://github.com/JeanKouss/selectance/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/JeanKouss/selectance.svg)](https://github.com/JeanKouss/selectance/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

## 📝 Table of Contents

- [Selectance](#selectance)
  - [📝 Table of Contents](#-table-of-contents)
  - [🔍 About ](#-about-)
  - [🏁 Getting Started ](#-getting-started-)
  - [💄 Customizing the style ](#-customizing-the-style-)
  - [🔧 Running the tests ](#-running-the-tests-)

## 🔍 About <a id = "about"></a>

Selectance gives you a way to make multiple options selection in HTML form. Here are some reasons you should use it :

- Easy to use : no JavaScript skill needed,
- Fast to implement : write the HTML code and let Selectance cares the rest for you,
- Preselection support,
- The submited values can be different from the text user sees,
- Full customisable style.

## 🏁 Getting Started <a id = "getting_started"></a>

Steps to use it :

1. Download sources from src/main :

   - [selectance-script.js](src/main/selectance-script.js) the main js script,
   - [selectance-style.css](src/main/selectance-style.css) a required css file. This file works in pair with selectance-script.js file and is for hidding or showing elements according to the class they are affected by selectance-script. It also apply a basic style to the selector.
  
2. Link files :

    Now link the downloaded files to your HTML. The style link can be everywhere but it is important to put the script after all the place you will use the multiselector.

    ```html
    <link rel="stylesheet" href="path/to/selectance-style.css">
    ```

    ```html
    <script src="path/to/selectance-script.js"></script>
    ```

3. Add class "multiselector" to HTML select elements that needs multiselect.
   
   ```html
	<select name="fruits" id="fruits" class="multiselector">
		<!-- Options -->
	</select>
   ```

## 💄 Customizing the style <a name = "customizing the style"></a>

Selectance works by removing the basic select element and uses other generated elements instead. So it can be anoying to customize multiselectors style.

Fortunately, there is a file [here](src/customization/selectance-custom_style.css) that will help you making the customization. In this file you will find the css selectors already writen and indications on the way to use them.

You can use it alone to code yourself all the style or link it after linking the main style (selectance-style.css), to overwrite the main style.

If you want to contribute by sharing you style customization, it will be great!

## 🔧 Running the tests <a name = "tests"></a>

To test it, you can download the repository and open test/fruits.html in you browser.
