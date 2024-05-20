/**
 * @file
 * Simply adds classes to ckeditor elements, such as our .wysiwyg class
 */

 (function ($, Drupal, window, document) {

    'use strict';

    Drupal.behaviors.pennCKEditorAddClass = {
      attach: function (context, settings) {
        context = context || document;
        settings = settings || Drupal.settings;
        //Add the wysiwyg class when we have a long text field for
        // and to the ckeditor for the styles dropdown
        //We can find a better way to do this later.
        $('.field--type-text-long .ck-editor__main').addClass('wysiwyg');
        $('.ck-editor__top').addClass('wysiwyg');
      }
    };

})(jQuery, Drupal, window, document);