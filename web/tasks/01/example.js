gtag('event', 'step_1');
$(document).ready(function () {
    ////////////////////////////
    ////////// Step 1 //////////
    ////////////////////////////
    logDatadogAction("index_page", "opened");
    $('.begin_journey').click(function () {
        logDatadogAction("index_page", "submitted");
        show_step_2();
        logDatadogAction("partial_form__find_address", "opened");
    });


    ////////////////////////////
    ////////// Step 2 //////////
    ////////////////////////////
    var address_id_populated = $('#address_id_populated');
    $('#step_2 .next').click(function () {
        validating_state(this);
        // Address
        if ($(address_id_populated).val() !== '') {
            hide_all_errors(address_id_populated);
            logDatadogAction("partial_form__find_address", "submitted");
            show_step_3();
            logDatadogAction("partial_form__personal_data", "opened");
        } else {
            show_error_primary(address_id_populated);
            scroll_to_first_error(address_id_populated);
        }
    });


    ////////////////////////////
    ////////// Step 3 //////////
    ////////////////////////////
    var title = $('select[name="title"]');
    var fname = $('input[name="fname"]');
    var lname = $('input[name="lname"]');
    var fname_clean = $('input[name="fname_clean"]');
    var lname_clean = $('input[name="lname_clean"]');
    var day_of_birth = $('select[name="day_of_birth"]');
    var month_of_birth = $('select[name="month_of_birth"]');
    var year_of_birth = $('select[name="year_of_birth"]');
    var date_of_birth = $('input[name="date_of_birth"]');
    $('#step_3 .next').click(function () {
        validating_state(this);
        var required_fields_valid = true;
        // Title
        if ($(title).val()) {
            hide_all_errors(title);
        } else {
            show_error_primary(title);
            scroll_to_first_error(title);
            required_fields_valid = false;
        }
        // First name
        if ($(fname).val().length > 1) {
            if ($(fname).val() !== $(lname).val()) {
                hide_all_errors(fname);
            } else {
                show_error_secondary(fname);
                scroll_to_first_error(fname);
                required_fields_valid = false;
            }
        } else {
            show_error_primary(fname);
            scroll_to_first_error(fname);
            required_fields_valid = false;
        }
        // Last name
        if ($(lname).val().length > 1) {
            if ($(lname).val() !== $(fname).val()) {
                hide_all_errors(lname);
            } else {
                show_error_secondary(lname);
                scroll_to_first_error(lname);
                required_fields_valid = false;
            }
        } else {
            show_error_primary(lname);
            scroll_to_first_error(lname);
            required_fields_valid = false;
        }
        // Day of birth
        if ($(day_of_birth).val()) {
            hide_all_errors(day_of_birth);
        } else {
            show_error_primary(day_of_birth);
            scroll_to_first_error(day_of_birth);
            required_fields_valid = false;
        }
        // Month of birth
        if ($(month_of_birth).val()) {
            if (month_of_birth.val() == '02') {
                if (day_of_birth.val() == '31' || day_of_birth.val() == '30') {
                    $('.dynamic_dob_error').text('There are only 29 days in February');
                    show_error_secondary(month_of_birth);
                    scroll_to_first_error(month_of_birth);
                    required_fields_valid = false;
                } else {
                    hide_all_errors(month_of_birth);
                }
            }
            if (month_of_birth.val() == '04') {
                if (day_of_birth.val() == '31') {
                    $('.dynamic_dob_error').text('There are only 30 days in April');
                    show_error_secondary(month_of_birth);
                    scroll_to_first_error(month_of_birth);
                    required_fields_valid = false;
                } else {
                    hide_all_errors(month_of_birth);
                }
            }
            if (month_of_birth.val() == '06') {
                if (day_of_birth.val() == '31') {
                    $('.dynamic_dob_error').text('There are only 30 days in June');
                    show_error_secondary(month_of_birth);
                    scroll_to_first_error(month_of_birth);
                    required_fields_valid = false;
                } else {
                    hide_all_errors(month_of_birth);
                }
            }
            if (month_of_birth.val() == '09') {
                if (day_of_birth.val() == '31') {
                    $('.dynamic_dob_error').text('There are only 30 days in September');
                    show_error_secondary(month_of_birth);
                    scroll_to_first_error(month_of_birth);
                    required_fields_valid = false;
                } else {
                    hide_all_errors(month_of_birth);
                }
            }
            if (month_of_birth.val() == '11') {
                if (day_of_birth.val() == '31') {
                    $('.dynamic_dob_error').text('There are only 30 days in November');
                    show_error_secondary(month_of_birth);
                    scroll_to_first_error(month_of_birth);
                    required_fields_valid = false;
                } else {
                    hide_all_errors(month_of_birth);
                }
            }
        } else {
            show_error_primary(month_of_birth);
            scroll_to_first_error(month_of_birth);
            required_fields_valid = false;
        }
        // Year of birth
        if ($(year_of_birth).val()) {
            hide_all_errors(year_of_birth);
        } else {
            show_error_primary(year_of_birth);
            scroll_to_first_error(year_of_birth);
            required_fields_valid = false;
        }
        // Date of birth
        if (date_of_birth.val() !== '') {
            if (validate_set_date(date_of_birth.val())) {
                hide_all_errors(date_of_birth);
            } else {
                show_error_primary(date_of_birth);
                scroll_to_first_error(date_of_birth);
                required_fields_valid = false;
            }
        }
        // Validate all of step
        if (required_fields_valid) {
            logDatadogAction("partial_form__personal_data", "submitted");
            show_step_4();
            logDatadogAction("partial_form__contact_information", "opened");
            $(fname_clean).val(clean_name($(fname).val()));
            $(lname_clean).val(clean_name($(lname).val()));
        }
    });
    // Custom scripts for this step
    $('.date_of_birth_select').change(function () {
        $(date_of_birth).val($(day_of_birth).val() + '/' + $(month_of_birth).val() + '/' + $(year_of_birth).val());
    });
    // Step revalidate fields based on action
    $(title).change(function () {
        hide_all_errors(title);
    });
    $(fname).keyup(function () {
        if ($(fname).val().length > 1) {
            hide_all_errors(fname);
        }
    });
    $(lname).keyup(function () {
        if ($(lname).val().length > 1) {
            hide_all_errors(lname);
        }
    });
    $(day_of_birth).change(function () {
        hide_all_errors(day_of_birth);
    });
    $(month_of_birth).change(function () {
        hide_all_errors(month_of_birth);
    });
    $(year_of_birth).change(function () {
        hide_all_errors(year_of_birth);
    });


    ////////////////////////////
    ////////// Step 4 //////////
    ////////////////////////////
    var telephone_number = $('input[name="telephone_number"]');
    var validate_telephone_number = $('input[name="validate_telephone_number"]');
    var email_address = $('input[name="email_address"]');
    var validate_email_address = $('input[name="validate_email_address"]');
    var email_validation_regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var validate_step_4 = $('#validate_step_4');
    $('#step_1_form .submit').click(function (event) {
        event.preventDefault();
        validating_state(this);
        var required_fields_valid = true;
        // Telephone_number
        if ($(telephone_number).val().length > 10) {
            cleanse_telephone_number($(telephone_number).val());
        } else {
            $(validate_telephone_number).val('');
            show_error_primary(telephone_number);
            scroll_to_first_error(telephone_number);
            required_fields_valid = false;
        }
        // Email address
        if ($(email_address).val().length > 2) {
            if (email_validation_regex.test($(email_address).val())) {
                cleanse_email_address($(email_address).val());
            } else {
                $(validate_email_address).val('');
                show_error_secondary(email_address);
                scroll_to_first_error(email_address);
                required_fields_valid = false;
            }
        } else {
            $(validate_email_address).val('');
            show_error_primary(email_address);
            scroll_to_first_error(email_address);
            required_fields_valid = false;
        }
        // Validate all of step
        if (required_fields_valid) {
            $(validate_step_4).val('true');
            
            logDatadogAction("partial_form__contact_information", "submitted");
        }
    });
    // Step revalidate fields based on action
    $(telephone_number).keyup(function () {
        if ($(telephone_number).val().length > 10) {
            hide_all_errors(telephone_number);
        }
    });
    $(email_address).keyup(function () {
        if (email_validation_regex.test($(email_address).val())) {
            hide_all_errors(email_address);
        }
    });
    // Validate all of step
    function step_4_validate_all() {
        if ($(validate_step_4).val() == 'true' &&
            $(validate_telephone_number).val() == 'true' &&
            $(validate_email_address).val() == 'true') {
            $('.loading-step').hide();
            gtag('event', 'step_signature');
            let form = $('#step_1_form');
            form.submit();
            logFormSubmit(DD_CONTENT_PARTIAL_FORM, form);
        }
    }


    // Show step 2
    function show_step_2() {
        $('.step').hide();
        $('#step_2').show();
        $('.loading-step').hide();
        $('body').addClass('progressed');
        $('section.form').addClass('min-height-75');
        gtag('event', 'step_2');
        scroll_to_top_of_page();
    }


    // Show step 3
    function show_step_3() {
        $('.step').hide();
        $('#step_3').show();
        $('.step_number').text('3');
        $('.loading-step').hide();
        gtag('event', 'step_3');
        scroll_to_top_of_page();
    }


    // Show step 4
    function show_step_4() {
        $('.step').hide();
        $('#step_4').show();
        $('.loading-step').hide();
        $('.steps').hide();
        $('.fname_pull').text($(fname).val());
        localStorage.setItem('fname', $(fname).val());
        $(fname_clean).val(clean_name($(fname).val()));
        $(lname_clean).val(clean_name($(lname).val()));
        gtag('event', 'step_4');
        scroll_to_top_of_page();
    }


    // Clean names
    function clean_name(element) {
        var formatted_name = element.replace(/[^a-z\- ]/gi, '');
        var capitalise_name = formatted_name.charAt(0).toUpperCase() + formatted_name.slice(1);
        return capitalise_name;
    }
    $(fname).keyup(function () {
        $(fname_clean).val(clean_name($(fname).val()));
    });
    $(lname).keyup(function () {
        $(lname_clean).val(clean_name($(lname).val()));
    });


    // Cleanse email address function
    function cleanse_email_address(email) {
        $(validate_email_address).val('');
        var emailvalidation = new data8.emailvalidation();
        emailvalidation.cleanse(
            email,
            'MX',
            null,
            [
                new data8.option('MissingMXRecordHandling', 'AssumeInvalid')
            ],
            show_cleansed_email_address
        );
    }
    function show_cleansed_email_address(result) {
        console.log('Email Address', email_address.val(), result);
        if (result.OriginalValid === false) {
            $(validate_email_address).val('');
            $(email_address).closest('.field').addClass('field-error');
            scroll_to_first_error(email_address);
            if (result.SuggestedEmailAddress && result.SuggestedEmailAddress.length > 0) {
                $(email_address).closest('.field').find('.error').hide();
                $(email_address).closest('.field').find('.email_validation_error').show();
                $(email_address).closest('.field').find('.email_validation_error .suggested_fix_conditional').show();
                $(email_address).closest('.field').find('.email_validation_error .suggested_fix_apply').removeClass('hide');
                $('.email_validation_error .suggested_fix').text(result.Comment);
                $('.email_validation_error .suggested_fix_apply').click(function () {
                    $(email_address).closest('.field').removeClass('field-error').addClass('field-valid');
                    $(email_address).closest('.field').find('.email_validation_error').hide();
                    $(email_address).val(result.SuggestedEmailAddress);
                    $(validate_email_address).val('true');
                });
            } else {
                $(email_address).closest('.field').removeClass('field-error');
                $(email_address).closest('.field').find('.email_validation_error').hide();
                $(email_address).closest('.field').find('.email_validation_error .suggested_fix_conditional').hide();
                $(email_address).closest('.field').find('.email_validation_error .suggested_fix_apply').addClass('hide');
                // Show the generic as we don't have a suggestion from data8
                $(email_address).closest('.field').find('.email_validation_error').show();
            }

        } else {
            $(validate_email_address).val('true');
            hide_all_errors(email_address);
            step_4_validate_all();
        }
    }


    // Cleanse telephone number
    function cleanse_telephone_number(telephoneNumber) {
        $(validate_telephone_number).val('');
        var phonevalidation = new data8.phonevalidation();
        phonevalidation.isvalid(
            telephoneNumber,
            'GB',
            [
                new data8.option('RequiredCountry', ''),
                new data8.option('AllowedPrefixes', ''),
                new data8.option('BarredPrefixes', ''),
                new data8.option('TreatUnavailableMobileAsInvalid', 'false'),
                new data8.option('ExcludeUnlikelyNumbers', 'false'),
                new data8.option('DefaultFormatType', 'National'),
                new data8.option('DifferentFormatCountries', '44'),
                new data8.option('DifferentFormatType', 'National'),
                new data8.option('UseLocalFormatting', 'true'),
                new data8.option('EndUserIPAddress', '')
            ],
            show_cleansed_telephone_number
        );
    }
    function show_cleansed_telephone_number(result) {
        console.log('Telephone Number', telephone_number.val(), result);
        if (result.Status.Success === false) {
            $(validate_telephone_number).val('');
            show_error_secondary(telephone_number);
            scroll_to_first_error_single(telephone_number);
            return false;
        }
        if (result.Result.ValidationResult === 'Invalid') {
            $(validate_telephone_number).val('');
            show_error_secondary(telephone_number);
            scroll_to_first_error_single(telephone_number);
        } else {
            $(validate_telephone_number).val('true');
            hide_all_errors(telephone_number);
            step_4_validate_all();
        }
    }


    // Ideal postcodes
    IdealPostcodes.PostcodeLookup.setup({
        apiKey: "ak_fake",
        context: "#postcode_lookup_field",
        placeholder: 'Postcode',
        msgUnhide: 'Enter Address Manually',
        button: '#find_address',
        msgSelect: 'Select address',
        outputFields: {
            premise: '#premise',
            thoroughfare: '#thoroughfare',
            building_number: '#building_number',
            building_name: '#building_name',
            line_1: '#line_1',
            line_2: '#line_2',
            county: '#county',
            post_town: '#post_town',
            postcode: '#postcode',
            country: '#country',
            udprn: '#udprn',
            id: '#address_id_populated'
        },
        onSearchCompleted: function () {
            show_error_primary(address_id_populated);
            scroll_to_first_error_single(address_id_populated);
        },
        onSelectCreated: function () {
            hide_all_errors(address_id_populated);
        },
        onAddressSelected: function () {
            $('input[name="thoroughfare"]').closest('.field').removeClass('field-error').addClass('field-valid');
            $('input[name="thoroughfare"]').closest('.field').find('.error').hide();
            $('#step_2 .next').addClass('animation-green-flash-infinite');
        }
    });
    $(document).on('click', '#find_address', function () {
        var idpc_input = $('#postcode_lookup_field input');
        if ($(idpc_input).val() !== '') {
            hide_all_errors(this);
        } else {
            show_error_primary(this);
        }
    });
});
