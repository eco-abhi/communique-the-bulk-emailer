
###################################################################################
# Regex for matching email list
email_validation_pattern = "^[\W]*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4}[\W]*[,,;]{1}[\W]*)*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4})[\W]*$"
# email_validation_pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
###################################################################################
# List of unallowed extensions in outlook

unallowed_extns_in_outlook = ['.ade',
                                '.adp',
                                '.app',
                                '.application',
                                '.appref-ms',
                                '.asp',
                                '.aspx',
                                '.asx',
                                '.bas',
                                '.bat',
                                '.bgi',
                                '.cab',
                                '.cer',
                                '.chm',
                                '.cmd',
                                '.cnt',
                                '.com',
                                '.cpl',
                                '.crt',
                                '.csh',
                                '.der',
                                '.diagcab',
                                '.exe',
                                '.fxp',
                                '.gadget',
                                '.grp',
                                '.hlp',
                                '.hpj',
                                '.hta',
                                '.htc',
                                '.inf',
                                '.ins',
                                '.iso',
                                '.isp',
                                '.its',
                                '.jar',
                                '.jnlp',
                                '.js',
                                '.jse',
                                '.ksh',
                                '.lnk',
                                '.mad',
                                '.maf',
                                '.mag',
                                '.mam',
                                '.maq',
                                '.mar',
                                '.mas',
                                '.mat',
                                '.mau',
                                '.mav',
                                '.maw',
                                '.mcf',
                                '.mda',
                                '.mdb',
                                '.mde',
                                '.mdt',
                                '.mdw',
                                '.mdz',
                                '.msc',
                                '.msh',
                                '.msh1',
                                '.msh2',
                                '.mshxml',
                                '.msh1xml',
                                '.msh2xml',
                                '.msi',
                                '.msp',
                                '.mst',
                                '.msu',
                                '.ops',
                                '.osd',
                                '.pcd',
                                '.pif',
                                '.pl',
                                '.plg',
                                '.prf',
                                '.prg',
                                '.printerexport',
                                '.ps1',
                                '.ps1xml',
                                '.ps2',
                                '.ps2xml',
                                '.psc1',
                                '.psc2',
                                '.psd1',
                                '.psdm1',
                                '.pst',
                                '.py',
                                '.pyc',
                                '.pyo',
                                '.pyw',
                                '.pyz',
                                '.pyzw',
                                '.reg',
                                '.scf',
                                '.scr',
                                '.sct',
                                '.shb',
                                '.shs',
                                '.theme',
                                '.tmp',
                                '.url',
                                '.vb',
                                '.vbe',
                                '.vbp',
                                '.vbs',
                                '.vhd',
                                '.vhdx',
                                '.vsmacros',
                                '.vsw',
                                '.webpnp',
                                '.website',
                                '.ws',
                                '.wsc',
                                '.wsf',
                                '.wsh',
                                '.xbap',
                                '.xll',
                                '.xnk',
]