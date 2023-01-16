const SUBSTITUTOR_CLASS = "multiselector-subst"; //! Used in css files also
class Multiselector {
    
    /**
     * 
     * @param {HTMLElement} multiselectorElement 
     */
    constructor (multiselectorElement) {
        this.selectedOptions = {};
        this.selectElement = multiselectorElement;
        this.elementId = multiselectorElement.id;
        this.elementName = multiselectorElement.name;
        this.initSubstitutor();
        // this.applySelectStyle();
        this.disableSelectElement();
        this.addOptionsToSubstitutor();
        this.renderChoicesChanges();
    }

    initSubstitutor() {
        this.substitutorDiv = document.createElement("div");
        this.substitutorDiv.classList.add(SUBSTITUTOR_CLASS);
        this.substitutorDiv.insertAdjacentHTML("afterbegin", "<div class='selected-items-div'></div>");
        this.substitutorInput = document.createElement("input");
        this.substitutorInput.name = this.elementName;
        this.substitutorInput.id = this.elementId;
        this.substitutorInput.type = 'hidden';
        this.substitutorInput.classList.add("multiselector-subst-input");
        this.substitutorDiv.appendChild(this.substitutorInput);
        this.substitutorSelecter = document.createElement("p");
        this.substitutorSelecter.innerHTML ='<span>Select</span> <svg fill="#000000" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-46.2 -46.2 422.40 422.40" xml:space="preserve" transform="rotate(0)" stroke="#000000" stroke-width="18.48"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"></path> </g></svg>';
        this.substitutorSelecter.setAttribute("tabindex", 0);
        this.substitutorSelecter.classList.add("select-subst");
        this.substitutorSelecter.addEventListener("click", (e) => {
            this.substitutorDiv.classList.toggle("active");
        });
        this.substitutorDiv.appendChild(this.substitutorSelecter);
        this.substitutorDiv.appendChild(document.createElement("ul"));
        
        this.selectElement.insertAdjacentElement('afterend', this.substitutorDiv);
        this.selectElement.style.display = "none";
    }

    applySelectStyle() {
        console.log(this.selectElement.style);
        this.substitutorDiv.style.width = this.selectElement.s;
        this.substitutorDiv.style.maxWidth = this.selectElement.style.maxWidth;
        this.substitutorSelecter.style.border = this.selectElement.style.border;
        this.substitutorDiv.style.borderRadius = this.selectElement.style.borderRadius;
        console.log("hey");
    }

    disableSelectElement() {
        this.selectElement.removeAttribute("name");
        this.selectElement.removeAttribute("id");
    }

    addOptionsToSubstitutor() {
        for (let opt of this.selectElement.querySelectorAll("option")) {
            this.addSubstitutionOption(opt.value, opt.textContent, opt.hasAttribute("selected"));
            opt.remove();
        }
    }

    addSubstitutionOption(value, text, selected=false) {
        let optionSubstitutor = document.createElement("li");
        optionSubstitutor.setAttribute("data-value", value);
        optionSubstitutor.innerHTML = "<span></span>"+text;
        this.substitutorDiv.querySelector("ul").appendChild(optionSubstitutor);
        optionSubstitutor.addEventListener("click", (e) => {
            this.toogleOptionSelection(value, text);
            this.renderChoicesChanges();
        });
        if(selected) {
            this.selectedOptions[value] = text;
        }
    }

    toogleOptionSelection(value, text) {
        if(this.selectedOptions.hasOwnProperty(value)) {
            delete this.selectedOptions[value];
        } else {
            this.selectedOptions[value] = text;
        }
    }

    renderChoicesChanges() {
        let selectedValues = [];
        let selectedTexts = [];
        for (let value in this.selectedOptions) {
            if (this.selectedOptions.hasOwnProperty(value)) {
                selectedValues.push(value)
                selectedTexts.push(this.selectedOptions[value]);
            }
        }
        // Updating options class
        for (let li of this.substitutorDiv.querySelectorAll("ul li.selected")) {
            if (selectedValues.indexOf(li.getAttribute("data-value")) == -1) {
                li.classList.remove("selected");
            }
        }
        for (let value of selectedValues) {
            this.substitutorDiv.querySelector("ul li[data-value='"+value+"']").classList.add("selected");
        }
        // Updating substitutorInput and 
        this.substitutorInput.value = selectedValues.join(",");
        // this.substitutorSelectionDisplayer.textContent = selectedTexts.join(",");
        let selectedItemsDiv = this.substitutorDiv.querySelector(".selected-items-div");
        selectedItemsDiv.innerHTML = "";
        for (let text of selectedTexts) {
            selectedItemsDiv.insertAdjacentHTML("beforeend", "<span>"+ text +"</span>");
        }
    }

}

let multiselectors = document.querySelectorAll(".multiselector");

for (let multiselector of multiselectors) {
    new Multiselector(multiselector);
}