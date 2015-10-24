<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = '';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

/**
 * Persons
 */
$route['persons']['get'] = 'api/persons';
$route['person/id/(:num)']['get'] = 'api/person/id/$1';
$route['person']['post'] = 'api/person';
$route['person']['put'] = 'api/person';
$route['person/id/(:num)']['delete'] = 'api/person/id/$1';

/**
 * Residences
 */
$route['residences']['get'] = 'api/residences';
$route['residence/id/(:num)']['get'] = 'api/residence/id/$1';
$route['residence']['post'] = 'api/residence';

/**
 * Barangay Clearances
 */
$route['barangay_clearances']['get'] = 'api/barangay_clearances';
$route['barangay_clearance/id/(:num)']['get'] = 'api/barangay_clearance/id/$1';
$route['barangay_clearance']['post'] = 'api/barangay_clearance';

/**
 * Barangay Business Clearances
 */
$route['barangay_business_clearances']['get'] = 'api/barangay_business_clearances';
$route['barangay_business_clearance/id/(:num)']['get'] = 'api/barangay_business_clearance/id/$1';
$route['barangay_business_clearance']['post'] = 'api/barangay_business_clearance';

/**
 * Certificates Of Closure
 */
$route['certificates_of_closure']['get'] = 'api/certificates_of_closure';
$route['certificate_of_closure/id/(:num)']['get'] = 'api/certificate_of_closure/id/$1';
$route['certificate_of_closure']['post'] = 'api/certificate_of_closure';

/**
 * Users
 */
$route['users']['get'] = 'api/users';
$route['user/id/(:num)']['get'] = 'api/user/id/$1';