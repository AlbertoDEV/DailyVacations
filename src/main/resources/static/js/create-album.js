document.addEventListener('DOMContentLoaded', () => {
    const daysCountInput = document.getElementById('daysCount');
    const dynamicFieldsContainer = document.getElementById('dynamic-fields-container');
    const translationContainer = document.getElementById('translation-container');

    const translations = {
        day: translationContainer.dataset.day,
        pageText: translationContainer.dataset.pagetext,
        pageTextPlaceholder: translationContainer.dataset.pagetextPlaceholder,
        photo: translationContainer.dataset.photo,
        description: translationContainer.dataset.description,
        descriptionPlaceholder: translationContainer.dataset.descriptionPlaceholder
    };

    const generateFields = () => {
        // Clear previous fields
        dynamicFieldsContainer.innerHTML = '';

        const days = parseInt(daysCountInput.value, 10);

        if (isNaN(days) || days < 1) {
            return;
        }

        for (let i = 0; i < days; i++) {
            const dayIndex = i;

            // Create a container for the day's fields
            const dayContainer = document.createElement('div');
            dayContainer.className = 'day-fields';

            const dayTitle = document.createElement('h3');
            dayTitle.textContent = `${translations.day} ${dayIndex + 1}`;
            dayContainer.appendChild(dayTitle);

            // Add textarea for the page text
            const textGroup = document.createElement('div');
            textGroup.className = 'form-group';
            const textLabel = document.createElement('label');
            textLabel.textContent = translations.pageText;
            const textInput = document.createElement('textarea');
            textInput.name = `days[${dayIndex}].pageText`;
            textInput.rows = 3;
            textInput.placeholder = translations.pageTextPlaceholder;
            textGroup.appendChild(textLabel);
            textGroup.appendChild(textInput);
            dayContainer.appendChild(textGroup);

            const photoGrid = document.createElement('div');
            photoGrid.className = 'photo-upload-grid';

            for (let j = 0; j < 4; j++) {
                const photoIndex = j;

                const photoGroup = document.createElement('div');
                photoGroup.className = 'photo-upload-group form-group';

                // File input
                const fileLabel = document.createElement('label');
                fileLabel.textContent = `${translations.photo} ${photoIndex + 1}`;
                const fileInputId = `day-${dayIndex}-photo-${photoIndex}`;
                fileLabel.setAttribute('for', fileInputId);

                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.id = fileInputId;
                // Use a naming convention that can be parsed on the backend
                fileInput.name = `days[${dayIndex}].photos[${photoIndex}].file`;

                // Description input
                const descLabel = document.createElement('label');
                descLabel.textContent = translations.description;
                const descInputId = `day-${dayIndex}-desc-${photoIndex}`;
                descLabel.setAttribute('for', descInputId);

                const descInput = document.createElement('input');
                descInput.type = 'text';
                descInput.id = descInputId;
                descInput.name = `days[${dayIndex}].photos[${photoIndex}].description`;
                descInput.placeholder = translations.descriptionPlaceholder;

                photoGroup.appendChild(fileLabel);
                photoGroup.appendChild(fileInput);
                photoGroup.appendChild(descLabel);
                photoGroup.appendChild(descInput);

                photoGrid.appendChild(photoGroup);
            }

            dayContainer.appendChild(photoGrid);
            dynamicFieldsContainer.appendChild(dayContainer);
        }
    };

    daysCountInput.addEventListener('change', generateFields);
    daysCountInput.addEventListener('keyup', generateFields);
});
