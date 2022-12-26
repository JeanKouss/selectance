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
        this.disableSelectElement();
        this.addOptionsToSubstitutor();
        this.renderChanges();
    }

    initSubstitutor() {
        this.substitutorDiv = document.createElement("div");
        this.substitutorDiv.classList.add(SUBSTITUTOR_CLASS);
        this.substitutorInput = document.createElement("input");
        this.substitutorInput.name = this.elementName;
        this.substitutorInput.id = this.elementId;
        this.substitutorInput.type = 'hidden';
        this.substitutorInput.classList.add("multiselector-subst-input");
        this.substitutorDiv.appendChild(this.substitutorInput);
        this.substitutorSelectionDisplayer = document.createElement("p");
        this.substitutorSelectionDisplayer.setAttribute("tabindex", 0);
        this.substitutorSelectionDisplayer.addEventListener("click", (e) => {
            this.substitutorDiv.classList.toggle("active");
        });
        this.substitutorDiv.appendChild(this.substitutorSelectionDisplayer);
        this.substitutorDiv.appendChild(document.createElement("ul"));
        
        this.selectElement.insertAdjacentElement('afterend', this.substitutorDiv);
        this.selectElement.style.display = "none";
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
            this.renderChanges();
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

    renderChanges() {
        let selectedValues = [];
        let selectedTexts = [];
        for (let value in this.selectedOptions) {
            if (this.selectedOptions.hasOwnProperty(value)) {
                selectedValues.push(value)
                selectedTexts.push(this.selectedOptions[value]);
            }
        }
        for (let li of this.substitutorDiv.querySelectorAll("ul li.selected")) {
            if (selectedValues.indexOf(li.getAttribute("data-value")) == -1) {
                li.classList.remove("selected");
            }
        }
        for (let value of selectedValues) {
            this.substitutorDiv.querySelector("ul li[data-value='"+value+"']").classList.add("selected");
        }
        this.substitutorInput.value = selectedValues.join(",");
        this.substitutorSelectionDisplayer.textContent = selectedTexts.join(",");
    }

}

let multiselectors = document.querySelectorAll(".multiselector");

for (let multiselector of multiselectors) {
    new Multiselector(multiselector);
}