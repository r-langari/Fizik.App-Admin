export const countries = [
    { id: 'Iran', name: 'Iran' },
    { id: 'Iraq', name: 'Iraq' },
    { id: 'Italy', name: 'Italy' },
    { id: 'Afghanistan', name: 'Afghanistan' },
    { id: 'Albania', name: 'Albania' },
    { id: 'Algeria', name: 'Algeria' },
    { id: 'Andorra', name: 'Andorra' },
    { id: 'Angola', name: 'Angola' },
    { id: 'Antigua and Barbuda', name: 'Antigua and Barbuda' },
    { id: 'Argentina', name: 'Argentina' },
    { id: 'Armenia', name: 'Armenia' },
    { id: 'Australia', name: 'Australia' },
    { id: 'Austria', name: 'Austria' },
    { id: 'Azerbaijan', name: 'Azerbaijan' },
    { id: 'The Bahamas', name: 'The Bahamas' },
    { id: 'Bahrain', name: 'Bahrain' },
    { id: 'India', name: 'India' },
    { id: 'Belarus', name: 'Belarus' },
    { id: 'Belgium', name: 'Belgium' },
    { id: 'Bhutan', name: 'Bhutan' },
    { id: 'Bolivia', name: 'Bolivia' },
    { id: 'Iceland', name: 'Iceland' },
    { id: 'Botswana', name: 'Botswana' },
    { id: 'Brazil', name: 'Brazil' },
    { id: 'Bulgaria', name: 'Bulgaria' },
    { id: 'Cabo Verde', name: 'Cabo Verde' },
    { id: 'Cambodia', name: 'Cambodia' },
    { id: 'Cameroon', name: 'Cameroon' },
    { id: 'Canada', name: 'Canada' },
    { id: 'Central African Republic', name: 'Central African Republic' },
    { id: 'Chile', name: 'Chile' },
    { id: 'China', name: 'China' },
    { id: 'Colombia', name: 'Colombia' },
    { id: 'Costa Rica', name: 'Costa Rica' },
    { id: 'Croatia', name: 'Croatia' },
    { id: 'Cyprus', name: 'Cyprus' },
    { id: 'Czech Republic', name: 'Czech Republic' },
    { id: 'Cuba', name: 'Cuba' },
    { id: 'Denmark', name: 'Denmark' },
    { id: 'Finland', name: 'Finland' },
    { id: 'France', name: 'France' },
    { id: 'Germany', name: 'Germany' },
];

export function GetProvincesFor(countryName){
    switch (countryName) {
        case 'Iran' :
            return [
                { id: 'Alborz', name: 'Alborz' },
                { id: 'Ardabil', name: 'Ardabil' },
                { id: 'Azerbaijan, East', name: 'Azerbaijan, East' },
                { id: 'Azerbaijan, West', name: 'Azerbaijan, West' },
                { id: 'Bushehr', name: 'Bushehr' },
                { id: 'Chahar Mahaal and Bakhtiari', name: 'Chahar Mahaal and Bakhtiari' },
                { id: 'Fars', name: 'Fars' },
                { id: 'Gilan', name: 'Gilan' },
                { id: 'Golestan', name: 'Golestan' },
                { id: 'Hamadan', name: 'Hamadan' },
                { id: 'Hormozgān', name: 'Hormozgān' },
                { id: 'Ilam', name: 'Ilam' },
                { id: 'Isfahan', name: 'Isfahan' },
                { id: 'Kerman', name: 'Kerman' },
                { id: 'Kermanshah', name: 'Kermanshah' },
                { id: 'Khorasan, North', name: 'Khorasan, North' },
                { id: 'Khorasan, Razavi', name: 'Khorasan, Razavi' },
                { id: 'Khorasan, South', name: 'Khorasan, South' },
                { id: 'Khuzestan', name: 'Khuzestan' },
                { id: 'Kohgiluyeh and Boyer-Ahmad', name: 'Kohgiluyeh and Boyer-Ahmad' },
                { id: 'Kurdistan', name: 'Kurdistan' },
                { id: 'Lorestan', name: 'Lorestan' },
                { id: 'Markazi', name: 'Markazi' },
                { id: 'Mazandaran', name: 'Mazandaran' },
                { id: 'Qom', name: 'Qom' },
                { id: 'Qazvin', name: 'Qazvin' },
                { id: 'Semnan', name: 'Semnan' },
                { id: 'Sistan and Baluchestan', name: 'Sistan and Baluchestan' },
                { id: 'Tehran', name: 'Tehran' },
                { id: 'Yazd', name: 'Yazd' },
                { id: 'Zanjan', name: 'Zanjan' },
                
            ];
        case 'turkey' :
            return [
                { id: 'turkey 1', name: 'turkey 1' },
                { id: 'turkey 2', name: 'turkey 2' },
                { id: 'turkey 3', name: 'turkey 3' },
            ];   
        case 'USA' :
            return [
                { id: 'washington', name: 'washington' },
                { id: 'minesuta', name: 'minesuta' },
                { id: 'california', name: 'california' },
            ];   
    }
    
}

export function GetCitiesFor(provinceName) {
    switch(provinceName) {
        case 'Khorasan, Razavi':
            return [
                { id: 'mashhad', name: 'mashhad' },
                { id: 'quchan', name: 'quchan' }
            ];
        case 'Lorestan':
            return [
                { id: 'خرم‌آباد', name: 'خرم‌آباد' },
                { id: 'بروجرد', name: 'بروجرد' }
            ];
    }
}