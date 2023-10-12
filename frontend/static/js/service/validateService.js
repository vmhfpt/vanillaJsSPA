export const validateName = (dataThis,elementError) => {
    var regex = /^[A-Za-z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừửữựỲỴÝỶỸýỳỷỹỵ\s]{5,}$/;
    if (regex.test($(dataThis.target).val())) {
        $(dataThis.target).css('border', '1px solid green');
        elementError.text('');
        return true;  
    } else {
        $(dataThis.target).css('border', '1px solid red');
        elementError.text(`* ${dataThis.name} is invalid `);
        return false; 
    }
}
export const validatePrice = (dataThis,elementError) => {
    var regex = /^[0-9]+$/;
    if(regex.test($(dataThis).val())) {
        var num = parseInt($(dataThis).val());
        if(num >= 2000 && num <= 5000000) {
            $(dataThis).css('border', '1px solid green');
            elementError.text('');
            return true;
        }
    }
    $(dataThis).css('border', '1px solid red');
    elementError.text('* Price is invalid ');
    return false;
}
export const validateContent = (dataThis,elementError) => {
    let regex = /^.{10,}$/;

    if (regex.test($(dataThis).val())) {
        $(dataThis).css('border', '1px solid green');
        elementError.text('');
        return true;
    } else {
        $(dataThis).css('border', '1px solid red');
        elementError.text('* Content is invalid ');
        return false
    }
}

export const validateEmail = (dataThis, elementError) => {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test($(dataThis).val())) {
        $(dataThis).css('border', '1px solid green');
        elementError.text('');
        return true;
    } else {
        $(dataThis).css('border', '1px solid red');
        elementError.text('* Email is invalid ');
        return false;
    }
}
export const validatePhoneNumber = (dataThis, elementError) => {
    let regex = /^(0|\\+84)[1-9][0-9]{8}$/;
    if (regex.test($(dataThis).val())) {
        $(dataThis).css('border', '1px solid green');
        elementError.text('');
        return true;
    } else {
        $(dataThis).css('border', '1px solid red');
        elementError.text('* Phone Number is invalid ');
        return false;
    }
}