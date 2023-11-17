const nftFactoryRho = `
contract @"nftFactory"(@id, @name, @description, @uri, mint) = {
    new nameCh, descriptionCh, uriCh in {
        nameCh!(name)|
        descriptionCh!(description)|
        uriCh!(uri)|

        contract mint(@to, returnCh) = {
            @"mint"!(id, to, *returnCh)
        }|

        contract @{id ++ "_name"}(returnCh) = {
            for (@name <- nameCh) {
                returnCh!(name)|
                nameCh!(name)
            }
        }|

        contract @{id ++ "_description"}(returnCh) = {
            for (@description <- descriptionCh) {
                returnCh!(description)|
                descriptionCh!(description)
            }
        }|

        contract @{id ++ "_uri"}(returnCh) = {
            for (@uri <- uriCh) {
                returnCh!(uri)|
                uriCh!(uri)
            }
        }
    }
}
`;

module.exports = nftFactoryRho;