export function standardizeNames(report) {
    let all = report.map(m => ({
        id:         m.id,
        name:       m.PREFERRED_NAME,
        last:       m.PREFERRED_NAME.split(',')[0],
        first:      m.PREFERRED_NAME.split(',')[1].substring(1),
        city:       m.ADDRESS_CITY              ??"",
        address1:   m.ADDRESS_STREET_1,
        address2:   m.ADDRESS_STREET_2          ??"",
        zip:        m.ADDRESS_POSTAL_CODE       ??"",
        phone:      m.INDIVIDUAL_PHONE,
        email:      m.INDIVIDUAL_EMAIL          ??"---",
        lat:   0, 
        long:  0, 
    }));

    var values = [];
    for(var o of all) {
        values.push({ key: o.name, value: o });
    }
    values.sort(function(a, b) { return a.key.localeCompare(b.key); });
    var arr = values.map(function (kvp) { return kvp.value; });
    return  arr;
}
