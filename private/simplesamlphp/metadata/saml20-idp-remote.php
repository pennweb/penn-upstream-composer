<?php
/**
 * SAML 2.0 remote IdP metadata for simpleSAMLphp.
 *
 * Remember to remove the IdPs you don't use from this file.
 *
 * See: https://rnd.feide.no/content/idp-remote-metadata-reference
 */

/*
 * Guest IdP. allows users to sign up and register. Great for testing!
 */
$metadata['https://idp.pennkey.upenn.edu/idp/shibboleth'] = array (
  'entityid' => 'https://idp.pennkey.upenn.edu/idp/shibboleth',
  'contacts' => array (),
  'metadata-set' => 'saml20-idp-remote',
  'SingleSignOnService' => array (
    0 => array (
      'Binding' => 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
      'Location' => 'https://idp.pennkey.upenn.edu/idp/profile/SAML2/Redirect/SSO',
    ),
    1 => array (
      'Binding' => 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
      'Location' => 'https://idp.pennkey.upenn.edu/idp/profile/SAML2/POST/SSO',
    ),
  ),
  'SingleLogoutService' => array (),
  'ArtifactResolutionService' => array (),
  'keys' => array (
    0 => array (
      'encryption' => true,
      'signing' => true,
      'type' => 'X509Certificate',
      'X509Certificate' => '
MIIDQDCCAiigAwIBAgIVAIW7U17BF4OIuf7KKeJ2n7iZo4sLMA0GCSqGSIb3DQEB BQUAMCAxHjAcBgNVBAMTFWlkcC5wZW5ua2V5LnVwZW5uLmVkdTAeFw0xMTAzMzEx NTU0MDRaFw0zMTAzMzExNTU0MDRaMCAxHjAcBgNVBAMTFWlkcC5wZW5ua2V5LnVw ZW5uLmVkdTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAIEhMlhqtKBa i3JwvaN1iMN6t9WUk8jRfd34HrDIpMkziZeVobbwdBhO2Rj3568dnsKlVNEaj7Zr 3Rf2yUzqb3VfjkW0bLDX0hiJDxogQH5cL2q8cl8jNpFjU40ptKbY5VTFkrR9YAfb 09mefQcyB5kvFoR8RASSw+9Ea+D1HKEEOaCyy2miwZVdvrCC4sAlsVX9kdaUwo4p o7dMpXKEjXEkByGKBh7VHB23OYaSC0gOvcOBy4dYjP3FqL4u8Yk3h9Ir6d3raGCl RsdPzH/kHrYbkuWT4pS5b41Ptrjal6mbGK+pKLGIkld5a9sipbjh3cwXm5nFpOTE OEWdmBEJkuECAwEAAaNxMG8wTgYDVR0RBEcwRYIVaWRwLnBlbm5rZXkudXBlbm4u ZWR1hixodHRwczovL2lkcC5wZW5ua2V5LnVwZW5uLmVkdS9pZHAvc2hpYmJvbGV0 aDAdBgNVHQ4EFgQUxDTQGrw4/7tu0/9D7BGoULqcWL4wDQYJKoZIhvcNAQEFBQAD ggEBAEkaTyQ3eC8thudSbBAh7bWADu2coDnw0FuWwcmI9ZbVHVU+HKbij5k5phFX DZaSTlZIwNkAeV4QTLS15TWmgsdaIxBBKfTfZJNXskfg6++2n91n4BfcDPFdjfn9 sfp4DKK1/2es+OtgLQVIM1lMU3ZzNGaSr/6UhF5zvY+M1RpxwG3//nBm8y2rOAt7 Y/REplQZ1ZwSoTxRxPhDa/Hflq+6mzWGdyCYDdq2Nn4Qk0bMnsNvZj3svVJeBfiG lnWwaH354x1lW83hhH/URqtxrgkftZ/oUVZCUruU3b5ytcHOYs/vXRTkRFsnb/EN iWe0xy1RO5prB/x5xli9fGaUdwE=
',
    ),
  ),
  'scope' => array (
    0 => 'upenn.edu',
  ),
);
