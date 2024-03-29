/**
 * @file
 * Sets the CKEditor widget background color based on the selection in a dropdown field.
 * It will apply the color to ALL CKEditor widgets ("instances") on this page.
 * 
 * This was helpful for getting started:
 * https://stackoverflow.com/questions/20461713/how-to-change-background-colour-of-ckeditor-instance-on-the-fly-from-external-co
 * 
 * "addClass()" and "removeClass()" are from the CKEditor API:
 * https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_dom_element.html
 */

 (function ($, Drupal, window, document) {

    'use strict';

    var selectedColor;
    var potentialColors = [];
    var constantClasses = "";

    Drupal.behaviors.pennCKEditorBgcolor = {
      attach: function (context, settings) {
        context = context || document;
        settings = settings || Drupal.settings;

        // Check if there are constant classes that should always be in the editor.
        if (settings.penn_ckeditor.textarea_bgcolor.constantClasses) {
            constantClasses = settings.penn_ckeditor.textarea_bgcolor.constantClasses;
        }

        // Check if there is a class prefix. If so, it needs to be added to the beginning of all classes in the dropdown.
        var classPrefix = "";
        if (settings.penn_ckeditor.textarea_bgcolor.dropdownClassPrefix) {
            classPrefix = settings.penn_ckeditor.textarea_bgcolor.dropdownClassPrefix;
        }

        // Get current selected color in the dropdown.
        // Dropdown ID is set in penn_ckeditor_form_alter, when we attach this library to the form.
        var $colorDropdown = $(settings.penn_ckeditor.textarea_bgcolor.dropdownID);
        selectedColor = classPrefix + $colorDropdown.val();

        // Make a list of all potential classses, so that we can find & remove them in switchColor()
        $(once('processed-colors', $colorDropdown)).find('option').each(function() {
            var newClasses = $(this).val().split(' ');
            for (var j in newClasses) {
                if($.inArray(newClasses[j], potentialColors) === -1) {
                    potentialColors.push(classPrefix + newClasses[j]);
                }
            }
        });

        // Listen to changes in the dropdown.
        $colorDropdown.on('change', function() {
            selectedColor = classPrefix + $colorDropdown.val();

            // Update bg color on all widgets.
            for (var key in CKEDITOR.instances) {
                var instance = CKEDITOR.instances[key];
                switchColor(instance);
            }
        });

        // On page load, apply bg color to all widgets.
        for (var key in CKEDITOR.instances) {
            var instance = CKEDITOR.instances[key];
            instance.on('instanceReady', function(e) {
                // First time
                switchColor(e.editor);
                if (constantClasses) {
                    addClasses(e.editor, constantClasses);
                }
                // Reapply the color if the user switches to source and back
                e.editor.on('contentDom', function() {
                    switchColor(e.editor);
                    if (constantClasses) {
                        addClasses(e.editor, constantClasses);
                    }
                });
            });
        }

        // Helper function that switches the background color of a CKEditor instance.
        function switchColor(instance) {
            var ckBody = instance.document.getBody();

            // First, remove any classes from the previous dropdown selection.
            var currentClasses = ckBody.getAttribute('class').split(' ');
            for (var i in currentClasses) {
                if ($.inArray(currentClasses[i], potentialColors) !== -1) {
                    ckBody.removeClass(currentClasses[i]);
                }
            }

            // Then, add the new classes.
            addClasses(instance, selectedColor);
        }

        function addClasses(instance, classes) {
            var ckBody = instance.document.getBody();

            var newClasses = classes.split(' ');
            for (var j in newClasses) {
                ckBody.addClass(newClasses[j]);
            }
        }

      }
    };

})(jQuery, Drupal, window, document);