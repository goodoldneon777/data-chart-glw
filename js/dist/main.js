//================================================================
//===  global.js  =============================================
//==========================================================


var g = {};


g.OS = 'linux';


g.maxRows = 20000;


g.error = false;


g.errorFunc = function(msg) {
	'use strict';
	g.error = true;
	alert(msg);
};
//================================================================
//===  extensions.js  =========================================
//==========================================================


String.prototype.fieldWrapDelete = function() {
	'use strict';
	if (g.OS === 'linux') {
		var str = this.replace(/\[/g,'');
		str = str.replace(/\]/g,'');
		return str;
	} else if (g.OS === 'windows') {
		return this.replace(/\"/g,'');
	}
};



String.prototype.fieldWrapAdd = function() {
	'use strict';
	if (g.OS === 'linux') {
		return '[' + this + ']';
	} else if (g.OS === 'windows') {
		return '"' + this + '"';
	}
};



String.prototype.fieldWrapToArray = function() {
	'use strict';
	var arr = [];
	if (g.OS === 'linux') {
		arr = this.match(/\[(.*?)\]/g);
		if (arr === null ) {
			arr = [];
		} else {
			$.each(arr, function( index, value ) {
				arr[index] = value;
			});
		}
		return arr;
	} else if (g.OS === 'windows') {
		var arrTemp = this.split('"');
		arr = [];
		$.each(arrTemp, function( index, value ) {
			if (index % 2 > 0) {
				arr.push(value.fieldWrapAdd());
			}
		});
		return arr;
	}
};



function nullIfBlank(val) {
	'use strict';
	if (val === '') {
		return null;
	} else {
		return val;
	}
}




function getUrlParameter(sParam) {
	'use strict';
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  var val = null;
  for (var i = 0; i < sURLVariables.length; i++) 
  {
      var sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) 
      {
          val = sParameterName[1];
          break;
      }
  }

  if (val === undefined) {
  	val = null;
  }

  return val;
}





//================================================================
//===  fieldExpand.js  ========================================
//==========================================================


function fieldExpandCreate(id, target) {
	'use strict';
	var html = '';


	$(target + ' .fieldExpand span').hide();
	$(target + ' .fieldExpand select').hide();


	var chemTestArr = [
		['BLAD', 'BLAD'],
		['ILAD', 'ILAD'],
		['BtlAvg', 'HM Bottle Average'],
		['DsfStartLeco', 'Desulf Initial (Leco)'],
		['DsfInit', 'Desulf Initial'],
		['DsfFinal', 'Desulf Final'],
		['B_V1', 'TD'],
		['B_L1', 'TOL'],
		['A_L1', 'Ar 1st'],
		['A_L2', 'Ar 2nd'],
		['V_L1', 'RH 1st'],
		['V_L2', 'RH 2nd'],
		['L_L1', 'LMF 1st'],
		['L_L2', 'LMF 2nd'],
		['C_M1', 'CC M1'],
		['C_M2', 'CC M2'],
		['C_M3', 'CC M3'],
		['MinRef', 'Min (Final Ref)'],
		['MaxRef', 'Max (Final Ref)'],
		['AimDesulf', 'Aim (Desulf)'],
		['AimBOP', 'Aim (BOP)'],
		['StartBOP', 'Pre-Alloy Pred (BOP)'],
		['FinalBOP', 'TOL Pred (BOP)'],
		['AimAr', 'Aim (Argon)']
	];

	var chemElemArr = [
		'C', 'Mn', 'P', 'S', 'Si', 'Cu', 'Ni', 'Cr', 'Mo', 'Sn',
		'Al', 'V', 'Cb', 'Ti', 'B', 'N', 'Ca', 'As', 'Sb'
	];

	var chemSlagArr = [
		['FeO_pct', 'FeO'],
		['Vratio', 'Vratio'],
		['CaO_pct', 'CaO'],
		['SiO2_pct', 'SiO2'],
		['MgO_pct', 'MgO'],
		['MnO_pct', 'MnO'],
		['P2O5_pct', 'P2O5'],
		['S_pct', 'S'],
		['Al2O3_pct', 'Al2O3'],
		['TiO2_pct', 'TiO2']
	];

	var temperatureArr = [
		['HMLadle', 'HM Ladle'],
		['Tap', 'Tap'],
		['TOL', 'TOL'],
		['ArArrive', 'Ar Arrive'],
		['ArLeave', 'Ar Leave'],
		['RHArrive', 'RH Arrive'],
		['RHDeox', 'RH Deox'],
		['RHLeave', 'RH Leave'],
		['CT1', 'CC Tundish 1'],
		['CT2', 'CC Tundish 2'],
		['CT3', 'CC Tundish 3'],
		['AimMelter', 'Aim Melter'],
		['AimCharge', 'Aim Charge Model']
	];

	var celoxArr = [
		['TapO2', 'BOP Tap O2'],
		['BTO', 'BOP BTO'],
		['ArArrive', 'Ar Arrive'],
		['ArLeave', 'Ar Leave'],
		['RHArrive', 'RH Arrive'],
		['RHDeox', 'RH Deox'],
		['RHLeave', 'RH Leave']
	];

	var furnaceAddArr = [
		['TotalChargeActual', 'Total Charge'],
		['MetalActual', 'Metal Charge'],
		['ScrapActual', 'Scrap Charge'],
		['MiscActual', 'Misc Charge'],
		['MetalPctActual', 'Metal Percent'],
		['ScrapPctActual', 'Scrap Percent'],
		['TotalChargeModel', 'Total Charge (Model)'],
		['MetalModel', 'Metal Charge (Model)'],
		['ScrapModel', 'Scrap Charge (Model)'],
		['MiscModel', 'Misc Charge (Model)'],
		['MetalPctModel', 'Metal Percent (Model)'],
		['ScrapPctModel', 'Scrap Percent (Model)']
	];

	var ladleAddArr = [
		['05', 'Reg FeMn'],
		['12', 'MC FeMn'],
		['13', 'Al Notch Bar'],
		['55', 'Al Cones'],
		['81', 'Coke'],
		['CS', 'Coke Super Sack'],
		['15', '75% FeSi'],
		['62', 'FeB'],
		['26', 'FeCb'],
		['95', 'FeTi'],
		['24', 'FeP'],
		['43', 'Slag Cond 70%'],
		['97', 'Ladle Desulf']
	];

	var scrapArr = [
		['FAB', '1 Bundles'],
		['FAF', 'Home'],
		['FAS', 'Pit + BF Iron'],
		['FBE', 'Cut Slabs'],
		['FFR', 'Frag'],
		['FHS', 'P&S'],
		['FOH', '1.5 Bundles'],
		['FRB', 'HMS Demo + Bello Briqs'],
		['FST', 'Side Trim'],
		['FTC', 'Tin Can'],
		['FTU', 'Tundish']
	];

	var scrapYardArr = [
		['E', 'East'],
		['W', 'West']
	];

	var vesselArr = ['25', '26'];

	var degasserArr = [
		['RHSlagDepth', 'Slag Depth'],
		['RHFreeboard', 'Freeboard'],
		['RHFinalStir', 'Final Stir Time'],
		['RHHtsOnSnorkel', 'Heats on Snorkel']
	];



	function selectCreate(target, arr) {
		var e = $(target);
		var text = null;

		e.empty();

		$.each(arr, function(row, value) {
			if ( $.isArray(value) ) {
				id = value[0];
				text = value[1];
			} else {
				id = text = value;
			}

			e.append($("<option></option>").attr("value", id).text(text));
		});

		e.show();

		return true;
	}


	switch (id) {
		case 'Chem':
			selectCreate(target + ' .select1', chemTestArr);
			selectCreate(target + ' .select2', chemElemArr);
			break;
		case 'ChemDiff':
			$(target + ' .message').html('&nbsp;(top minus bottom)');
			$(target + ' .message').show();
			selectCreate(target + ' .select1', chemTestArr);
			selectCreate(target + ' .select2', chemTestArr);
			selectCreate(target + ' .select3', chemElemArr);
			break;
		case 'SlagChem':
			selectCreate(target + ' .select1', chemSlagArr);
			break;
		case 'Temp':
			selectCreate(target + ' .select1', temperatureArr);
			break;
		case 'TempDiff':
			$(target + ' .message').html('&nbsp;(top minus bottom)');
			$(target + ' .message').show();
			selectCreate(target + ' .select1', temperatureArr);
			selectCreate(target + ' .select2', temperatureArr);
			break;
		case 'Celox':
			selectCreate(target + ' .select1', celoxArr);
			break;
		case 'FurnaceAdd':
			selectCreate(target + ' .select1', furnaceAddArr);
			break;
		case 'LadleAdd':
			selectCreate(target + ' .select1', ladleAddArr);
			break;
		case 'Scrap':
			selectCreate(target + ' .select1', scrapArr);
			break;
		case 'ScrapYard':
			selectCreate(target + ' .select1', scrapYardArr);
			break;
		case 'Vessel':
			selectCreate(target + ' .select1', vesselArr);
			break;
		case 'Degasser':
			selectCreate(target + ' .select1', degasserArr);
			break;
		default:
			break;
	}

	return html;
}
//================================================================
//===  definitions.js  ========================================
//==========================================================


function toggleSulfurLock(idMain, target) {
	// Changes the element to "S" and prevents the user from changing it.

	var sulfurLockTests = ['BtlAvg', 'DsfStartLeco', 'DsfInit', 'DsfFinal', 'AimDesulf'];
	var lockSulfur = false;

	if (idMain === 'Chem') {
		test1 = $(target + ' .select1').val();
		testArray = [ test1 ];
		elem = $(target + ' .select2');
	} else if (idMain === 'ChemDiff') {
		test1 = $(target + ' .select1').val();
		test2 = $(target + ' .select2').val();
		testArray = [ test1, test2 ];
		elem = $(target + ' .select3');
	} else {
		return false;
	}

	$.each(testArray, function( index, value ) {
		if (jQuery.inArray(value, sulfurLockTests) !== -1) {
			lockSulfur = true;
		}
	});
	
	if (lockSulfur) {
		elem.val('S');
		elem.prop('disabled', true);
	} else {
		elem.prop('disabled', false);
	}

	return lockSulfur;
}



function getDefinitions(idMain, params, paramsNames) {
	'use strict';

	var obj = {
		sql: {}
	};

	
	obj.sql.centralTable = 'bop_ht';
	obj.sql.centralDB = 'USSGLW.dbo';
	obj.sql.centralTableHeat = 'ht_num';
	obj.sql.centralTableDate = 'chrg_dt';
	obj.sql.joinKeyArray = ['ht_num', 'tap_yr'];
	

	if (params === null) {
		params = ['', '', '', '', ''];
	}
	if (paramsNames === null) {
		paramsNames = ['', '', '', '', ''];
	}




	switch (idMain) {
		case 'Chem':
			var test = params[0];
			var elem = params[1];
			obj.sql.idFull = (idMain + ' ' + test + ' ' + elem).fieldWrapAdd();
			switch (test) {
				case 'BtlAvg':
					elem = 'S';
					obj.sql.idFull = (idMain + ' ' + test + ' ' + elem).fieldWrapAdd();
					obj.sql.field	= 'dslf_avg_btl_S';
					obj.sql.table	= 'bop_ht';
					obj.sql.db = 'USSGLW.dbo';
					break;
				case 'DsfStartLeco':
					elem = 'S';
					obj.sql.idFull = (idMain + ' ' + test + ' ' + elem).fieldWrapAdd();
					obj.sql.field = 'S_pct';
					obj.sql.table = 'bop_ht_leco';
					obj.sql.db = 'USSGLW.dbo';
					obj.sql.filterLocal = '  and test_typ=\'IS\'';
					break;
				case 'DsfInit':
					elem = 'S';
					obj.sql.idFull = (idMain + ' ' + test + ' ' + elem).fieldWrapAdd();
					obj.sql.field = 'dslf_init_S';
					obj.sql.table = 'bop_ht';
					obj.sql.db = 'USSGLW.dbo';
					break;
				case 'DsfFinal':
					elem = 'S';
					obj.sql.idFull = (idMain + ' ' + test + ' ' + elem).fieldWrapAdd();
					obj.sql.field = 'dslf_S_after_cycle';
					obj.sql.table = 'bop_ht';
					obj.sql.db = 'USSGLW.dbo';
					obj.sql.filterRealistic = obj.sql.idFull + ' < 0.050';
					break;
				case 'AimDesulf':
					elem = 'S';
					obj.sql.idFull = (idMain + ' ' + test + ' ' + elem).fieldWrapAdd();
					obj.sql.field = 'dslf_calc_aim_S';
					obj.sql.table = 'bop_ht';
					obj.sql.db = 'USSGLW.dbo';
					break;
				case 'AimBOP':
					obj.sql.field = 'mdl_aim_pct';
					obj.sql.table = 'bop_chem_rec';
					obj.sql.db = 'Alloy_Model.dbo';
					obj.sql.filterLocal =
						'  and fac_id not like \'%S\' \n' +
						'  and fac_id not like \'%T\' \n' +
						'  and elem_cd = \'' + elem.fieldWrapDelete().toUpperCase() + '\' \n' +
						'  and mdl_run_seq_num = ( \n' +  //This line (and the following 5) makes the query take only the last model run for each heat.
						'    select max(mdl_run_seq_num) \n' +
				    '    from Alloy_Model.dbo.bop_chem_rec as f \n' +
				    '    where f.ht_num = bop_chem_rec.ht_num \n' +
				    '      and f.tap_yr = bop_chem_rec.tap_yr \n' +
  					'  )';
					break;
				case 'MinRef':
					obj.sql.field = 'min_pct';
					obj.sql.table = 'ht_ref_chem_mod';
					obj.sql.db = 'USSGLW.dbo';
					obj.sql.filterLocal =
						'  and elem_cd = \'' + elem.fieldWrapDelete().toUpperCase() + '\'';
					break;
				case 'MaxRef':
					obj.sql.field = 'max_pct';
					obj.sql.table = 'ht_ref_chem_mod';
					obj.sql.db = 'USSGLW.dbo';
					obj.sql.filterLocal =
						'  and elem_cd = \'' + elem.fieldWrapDelete().toUpperCase() + '\'';
					break;
				case 'StartBOP':
					obj.sql.field = 'mdl_start_pct';
					obj.sql.table = 'bop_chem_rec';
					obj.sql.db = 'Alloy_Model.dbo';
					obj.sql.filterLocal =
						'  and fac_id not like \'%S\' \n' +
						'  and fac_id not like \'%T\' \n' +
						'  and elem_cd = \'' + elem.fieldWrapDelete().toUpperCase() + '\' \n' +
						'  and mdl_run_seq_num = ( \n' +  //This line (and the following 5) makes the query take only the last model run for each heat.
				    '    select max(mdl_run_seq_num) \n' +
				    '    from Alloy_Model.dbo.bop_chem_rec as f \n' +
				    '    where f.ht_num = bop_chem_rec.ht_num \n' +
				    '      and f.tap_yr = bop_chem_rec.tap_yr \n' +
  					'  )';
					break;
				case 'FinalBOP':
					obj.sql.field = 'pred_final_pct';
					obj.sql.table = 'bop_chem_rec';
					obj.sql.db = 'Alloy_Model.dbo';
					obj.sql.filterLocal =
						'  and fac_id not like \'%S\' \n' +
						'  and fac_id not like \'%T\' \n' +
						'  and elem_cd = \'' + elem.fieldWrapDelete().toUpperCase() + '\' \n' +
						'  and mdl_run_seq_num = ( \n' +  //This line (and the following 5) makes the query take only the last model run for each heat.
				    '    select max(mdl_run_seq_num) \n' +
				    '    from Alloy_Model.dbo.bop_chem_rec as f \n' +
				    '    where f.ht_num = bop_chem_rec.ht_num \n' +
				    '      and f.tap_yr = bop_chem_rec.tap_yr \n' +
  					'  )';
					break;
				case 'AimAr':
					obj.sql.field = 'mdl_aim_pct';
					obj.sql.table = 'ars_chem_rec';
					obj.sql.db = 'Alloy_Model.dbo';
					obj.sql.filterLocal =
						'  and fac_id not like \'%S\' \n' +
						'  and fac_id not like \'%T\' \n' +
						'  and elem_cd = \'' + elem.fieldWrapDelete().toUpperCase() + '\' \n' +
						'  and mdl_run_seq_num = ( \n' +  //This line (and the following 5) makes the query take only the last model run for each heat.
				    '    select max(mdl_run_seq_num) \n' +
				    '    from Alloy_Model.dbo.bop_chem_rec as f \n' +
				    '    where f.ht_num = bop_chem_rec.ht_num \n' +
				    '      and f.tap_yr = bop_chem_rec.tap_yr \n' +
  					'  )';
					break;
				default:
					obj.sql.field = 'elem_pct';
					obj.sql.table = 'ms_ht_chem_samp_anal';
					obj.sql.db = 'USSGLW.dbo';
					obj.sql.filterLocal =
						'  and test_id like \'' + test + '\' \n' +
						'  and elem_cd = \'' + elem.fieldWrapDelete().toUpperCase() + '\' ';
					break;
			}
			obj.sql.idFull = (idMain + ' ' + test + ' ' + elem).fieldWrapAdd();
			obj.title	= idMain + ' ' + elem + ': ' + paramsNames[0];
			obj.type = 'linear';
			obj.unit = '%';
			obj.format = '.4f';
			obj.decimals = 4;
			break;
		case 'ChemDiff':
			var test1 = params[0];
			var test2	= params[1];
			var elem = params[2];
			obj.sql.idFull = (idMain + ' ' + test1 + ' ' + test2 + ' ' + elem).fieldWrapAdd();
			obj.title	= idMain + ' ' + paramsNames[2] + ': ' + paramsNames[0] + ' - ' + paramsNames[1];
			obj.type = 'linear';
			obj.unit = '%';
			obj.format = '.4f';
			obj.decimals = 4;
			obj.sql.field = ('Chem ' + test1 + ' ' + elem.toUpperCase()).fieldWrapAdd() + ' - ' + ('Chem ' + test2 + ' ' + elem.toUpperCase()).fieldWrapAdd();
			break;
		case 'SlagChem':
			var elem = params[0]
			var elemTitle = paramsNames[0]
			obj.sql.idFull = (idMain + ' ' + elem).fieldWrapAdd();
			obj.title = idMain + ' ' + elemTitle;
			obj.type = 'linear';
			obj.unit = '%';
			obj.format = '.2f';
			obj.decimals = 2;
			obj.sql.field = elem;
			obj.sql.table = 'bop_ht_slag_chem';
			obj.sql.db = 'USSGLW.dbo';
			break;
		case 'FurnaceAdd':
			var type 	= params[0];
			switch (type) {
				case 'TotalChargeActual':
					obj.sql.field = 'tot_chrg_tons';
					obj.sql.field = 
						'case \n ' +
						'  when calc_dt < \'4/1/2014\' then ' + obj.sql.field + ' * 2000 \n ' +
						'  else ' + obj.sql.field + ' * 1000 \n ' +
						'end ';  //Fix for when field was in tons instead of thousands of lbs.
					obj.sql.table = 'bop_ht_chrg_mdl_data';
					obj.sql.filterLocal = '  and last_calc_flg = \'O\'';
					break;
				case 'MetalActual':
					obj.sql.field = 'tot_hm_chrg_tons';
					obj.sql.field = 
						'case \n ' +
						'  when calc_dt < \'4/1/2014\' then ' + obj.sql.field + ' * 2000 \n ' +
						'  else ' + obj.sql.field + ' * 1000 \n ' +
						'end ';  //Fix for when field was in tons instead of thousands of lbs.
					obj.sql.table = 'bop_ht_chrg_mdl_data';
					obj.sql.table = 'bop_ht_chrg_mdl_data';
					obj.sql.filterLocal = '  and last_calc_flg = \'O\'';
					break;
				case 'ScrapActual':
					obj.sql.field = 'tot_scrap_chrg_tons';
					obj.sql.field = 
						'case \n ' +
						'  when calc_dt < \'4/1/2014\' then ' + obj.sql.field + ' * 2000 \n ' +
						'  else ' + obj.sql.field + ' * 1000 \n ' +
						'end ';  //Fix for when field was in tons instead of thousands of lbs.
					obj.sql.table = 'bop_ht_chrg_mdl_data';
					obj.sql.table = 'bop_ht_chrg_mdl_data';
					obj.sql.filterLocal = '  and last_calc_flg = \'O\'';
					break;
				case 'MiscActual':
					obj.sql.field = 'tot_misc_tons';
					obj.sql.field = 
						'case \n ' +
						'  when calc_dt < \'4/1/2014\' then ' + obj.sql.field + ' * 2000 \n ' +
						'  else ' + obj.sql.field + ' * 1000 \n ' +
						'end ';  //Fix for when field was in tons instead of thousands of lbs.
					obj.sql.table = 'bop_ht_chrg_mdl_data';
					obj.sql.table = 'bop_ht_chrg_mdl_data';
					obj.sql.filterLocal = '  and last_calc_flg = \'O\'';
					break;
				case 'MetalPctActual':
					obj.sql.field = 'hm_pct';
					obj.sql.table = 'bop_ht_chrg_mdl_data';
					obj.sql.filterLocal = '  and last_calc_flg = \'O\'';
					break;
				case 'ScrapPctActual':
					obj.sql.field = 'scrap_pct';
					obj.sql.table = 'bop_ht_chrg_mdl_data';
					obj.sql.filterLocal = '  and last_calc_flg = \'O\'';
					break;
				case 'TotalChargeModel':
					obj.sql.field = 'tot_chrg_tons';
					obj.sql.field = 
						'case \n ' +
						'  when calc_dt < \'4/1/2014\' then ' + obj.sql.field + ' * 2000 \n ' +
						'  else ' + obj.sql.field + ' * 1000 \n ' +
						'end ';  //Fix for when field was in tons instead of thousands of lbs.
					obj.sql.table = 'bop_ht_chrg_mdl_data';
					obj.sql.table = 'bop_ht_chrg_mdl_data';
					obj.sql.filterLocal = '  and last_calc_flg = \'P\'';
					break;
				case 'MetalModel':
					obj.sql.field = 'tot_hm_chrg_tons';
					obj.sql.field = 
						'case \n ' +
						'  when calc_dt < \'4/1/2014\' then ' + obj.sql.field + ' * 2000 \n ' +
						'  else ' + obj.sql.field + ' * 1000 \n ' +
						'end ';  //Fix for when field was in tons instead of thousands of lbs.
					obj.sql.table = 'bop_ht_chrg_mdl_data';
					obj.sql.table = 'bop_ht_chrg_mdl_data';
					obj.sql.filterLocal = '  and last_calc_flg = \'P\'';
					break;
				case 'ScrapModel':
					obj.sql.field = 'tot_scrap_chrg_tons';
					obj.sql.field = 
						'case \n ' +
						'  when calc_dt < \'4/1/2014\' then ' + obj.sql.field + ' * 2000 \n ' +
						'  else ' + obj.sql.field + ' * 1000 \n ' +
						'end ';  //Fix for when field was in tons instead of thousands of lbs.
					obj.sql.table = 'bop_ht_chrg_mdl_data';
					obj.sql.table = 'bop_ht_chrg_mdl_data';
					obj.sql.filterLocal = '  and last_calc_flg = \'P\'';
					break;
				case 'MiscModel':
					obj.sql.field = 'tot_misc_tons';
					obj.sql.field = 
						'case \n ' +
						'  when calc_dt < \'4/1/2014\' then ' + obj.sql.field + ' * 2000 \n ' +
						'  else ' + obj.sql.field + ' * 1000 \n ' +
						'end ';  //Fix for when field was in tons instead of thousands of lbs.
					obj.sql.table = 'bop_ht_chrg_mdl_data';
					obj.sql.table = 'bop_ht_chrg_mdl_data';
					obj.sql.filterLocal = '  and last_calc_flg = \'P\'';
					break;
				case 'MetalPctModel':
					obj.sql.field = 'hm_pct';
					obj.sql.table = 'bop_ht_chrg_mdl_data';
					obj.sql.filterLocal = '  and last_calc_flg = \'P\'';
					break;
				case 'ScrapPctModel':
					obj.sql.field = 'scrap_pct';
					obj.sql.table = 'bop_ht_chrg_mdl_data';
					obj.sql.filterLocal = '  and last_calc_flg = \'P\'';
					break;
				default:
					break;
			}
			obj.sql.idFull = (idMain + ' ' + type).fieldWrapAdd();
			obj.title	= idMain + ': ' + paramsNames[0];
			obj.type = 'linear';
			obj.unit = 'lb';
			obj.format = '.f';
			obj.decimals = 0;
			obj.sql.db = 'USSGLW.dbo';
			obj.sql.joinType = 'left outer join';
			break;
		case 'LadleAdd':
			var matCode = params[0];
			obj.sql.idFull = (idMain + ' ' + matCode).fieldWrapAdd();
			obj.title	= idMain + ' ' + paramsNames[0];
			obj.type = 'linear';
			obj.unit = 'lb';
			obj.format = '.f';
			obj.decimals = 0;
			obj.sql.field = 'act_wt';
			obj.sql.table = 'bop_ht_mat_add';
			obj.sql.db = 'USSGLW.dbo';
			obj.sql.filterLocal = '  and mat_cd = \'' + matCode + '\'';
			obj.sql.joinType = 'left outer join';
			break;
		case 'Scrap':
			var matCode = params[0];
			obj.sql.idFull = (idMain + ' ' + matCode).fieldWrapAdd();
			obj.title = idMain + ' ' + paramsNames[0];
			obj.type = 'linear';
			obj.unit = 'lb';
			obj.format = '.f';
			obj.decimals = 0;
			obj.sql.field = 'act_wt';
			obj.sql.table = 'bop_ht_scrap_add';
			obj.sql.db = 'USSGLW.dbo';
			obj.sql.filterLocal = '  and scrp_cd = \'' + matCode + '\'';
			obj.sql.joinType = 'left outer join';
			break;
		case 'ScrapYard':
			var yard = params[0];
			obj.sql.idFull = (idMain + ' ' + yard).fieldWrapAdd();
			obj.title = idMain;
			obj.type = 'text';
			obj.unit = '';
			obj.format = '.f';
			obj.decimals = 0;
			obj.sql.field = 'box_1_scale';
			obj.sql.table = 'bop_ht_scrp_chrg';
			obj.sql.db = 'USSGLW.dbo';
			obj.sql.filterLocal = '  and box_1_scale = \'' + yard + '\'';
			obj.disableOperator = true;
			break;
		case 'Temp':
			var test = params[0];
			obj.title = idMain + ' ' + paramsNames[0];
			obj.type = 'linear';
			obj.unit = '°F';
			obj.format = '.f';
			obj.decimals = 0;
			obj.sql.idFull = (idMain + ' ' + test).fieldWrapAdd();
			switch (test) {
				case 'HMLadle':
					obj.sql.field = 'hm_ldl_act_tp';
					obj.sql.table = 'bop_ht';
					obj.sql.db = 'USSGLW.dbo';
					obj.sql.filterRealistic = obj.sql.idFull + ' > 2000 ';
					break;
				case 'Tap':
					obj.sql.field = 'tap_tp';
					obj.sql.table = 'bop_ht';
					obj.sql.db = 'USSGLW.dbo';
					obj.sql.filterRealistic = obj.sql.idFull + ' > 2800 ';
					break;
				case 'TOL':
					obj.sql.field = 'TOL_tp';
					obj.sql.table = 'bop_ht';
					obj.sql.db = 'USSGLW.dbo';
					obj.sql.filterRealistic = obj.sql.idFull + ' > 2800 ';
					break;
				case 'ArArrive':
					obj.sql.field = 'samp_tp';
					obj.sql.table = 'ms_heat_celox';
					obj.sql.db = 'USSGLW.dbo';
					obj.sql.filterLocal =
						'  and fac_id = \'A\' \n' +
						'  and samp_designation = \'ARV\' ';
					obj.sql.filterRealistic = obj.sql.idFull + ' > 2800 ';
					break;
				case 'ArLeave':
					obj.sql.field = 'samp_tp';
					obj.sql.table = 'ms_heat_celox';
					obj.sql.db = 'USSGLW.dbo';
					obj.sql.filterLocal =
						'  and fac_id = \'A\' \n' +
						'  and samp_designation = \'LV\' ';
					obj.sql.filterRealistic = obj.sql.idFull + ' > 2800 ';
					break;
				case 'RHArrive':
					obj.sql.field = 'samp_tp';
					obj.sql.table = 'ms_heat_celox';
					obj.sql.db = 'USSGLW.dbo';
					obj.sql.filterLocal =
						'  and fac_id = \'V\' \n' +
						'  and samp_designation = \'ARV\' ';
					obj.sql.filterRealistic = obj.sql.idFull + ' > 2800 ';
					break;
				case 'RHDeox':
					obj.sql.field = 'samp_tp';
					obj.sql.table = 'ms_heat_celox';
					obj.sql.db 			= 'USSGLW.dbo';
					obj.sql.filterLocal =
						'  and fac_id = \'V\' \n' +
						'  and samp_designation = \'DX\' ';
					obj.sql.filterRealistic = obj.sql.idFull + ' > 2800 ';
					break;
				case 'RHLeave':
					obj.sql.field = 'samp_tp';
					obj.sql.table = 'ms_heat_celox';
					obj.sql.db 		= 'USSGLW.dbo';
					obj.sql.filterLocal =
						'  and fac_id = \'V\' \n' +
						'  and samp_designation = \'LV\' ';
					obj.sql.filterRealistic = obj.sql.idFull + ' > 2800 ';
					break;
				case 'CT1':
					obj.sql.field = 'samp_tp';
					obj.sql.table = 'ms_heat_celox';
					obj.sql.db 		= 'USSGLW.dbo';
					obj.sql.filterLocal =
						'  and fac_id = \'C\' \n' +
						'  and samp_designation = \'CT1\' ';
					obj.sql.filterRealistic = obj.sql.idFull + ' > 2800 ';
					break;
				case 'CT2':
					obj.sql.field = 'samp_tp';
					obj.sql.table = 'ms_heat_celox';
					obj.sql.db 		= 'USSGLW.dbo';
					obj.sql.filterLocal =
						'  and fac_id = \'C\' \n' +
						'  and samp_designation = \'CT2\' ';
					obj.sql.filterRealistic = obj.sql.idFull + ' > 2800 ';
					break;
				case 'CT3':
					obj.sql.field = 'samp_tp';
					obj.sql.table = 'ms_heat_celox';
					obj.sql.db 		= 'USSGLW.dbo';
					obj.sql.filterLocal =
						'  and fac_id = \'C\' \n' +
						'  and samp_designation = \'CT3\' ';
					obj.sql.filterRealistic = obj.sql.idFull + ' > 2800 ';
					break;
				case 'AimMelter':
					obj.sql.field 	= 'melter_aim_tap_tp';
					obj.sql.table 	= 'bop_ht';
					obj.sql.db 			= 'USSGLW.dbo';
					obj.sql.filterRealistic = obj.sql.idFull + ' > 2800 ';
					break;
				case 'AimCharge':
					obj.sql.field 	= 'mdl_aim_tap_tp';
					obj.sql.table 	= 'bop_ht';
					obj.sql.db 			= 'USSGLW.dbo';
					obj.sql.filterRealistic = obj.sql.idFull + ' > 2800 ';
					break;
				default:
					break;
			}
			break;
		case 'TempDiff':
			var test1 	= params[0];
			var test2 	= params[1];
			obj.sql.idFull 	= (idMain + ' ' + test1 + ' ' + test2).fieldWrapAdd();
			obj.title		= idMain + ': ' + paramsNames[0] + ' - ' + paramsNames[1];
			obj.type 		= 'linear';
			obj.unit		= '°F';
			obj.format 	= '.f';
			obj.decimals = 0;
			obj.sql.field 	= ('Temp ' + test1).fieldWrapAdd() + ' - ' + ('Temp ' + test2).fieldWrapAdd();
			break;
		case 'Celox':
			var test 		= params[0];
			obj.title 	= idMain + ' ' + paramsNames[0];
			obj.type 		= 'linear';
			obj.unit 		= 'ppm';
			obj.format 	= '.f';
			obj.decimals 	= 0;
			obj.sql.idFull 	= (idMain + ' ' + test).fieldWrapAdd();
			switch (test) {
				case 'TapO2':
					obj.sql.field 	= 'tap_oxy';
					obj.sql.table 	= 'bop_ht';
					obj.sql.db 			= 'USSGLW.dbo';
					obj.sql.filterRealistic = obj.sql.idFull + ' > 0 ';
					break;
				case 'BTO':
					obj.sql.field 	= 'samp_oxy';
					obj.sql.table 	= 'ms_heat_celox';
					obj.sql.db 			= 'USSGLW.dbo';
					obj.sql.filterLocal =
						'  and fac_id = \'B\' \n' +
						'  and samp_designation = \'BTO\' ';
					obj.sql.filterRealistic = obj.sql.idFull + ' > 0 ';
					break;
				case 'ArArrive':
					obj.sql.field 	= 'samp_oxy';
					obj.sql.table 	= 'ms_heat_celox';
					obj.sql.db 			= 'USSGLW.dbo';
					obj.sql.filterLocal =
						'  and fac_id = \'A\' \n' +
						'  and samp_designation = \'ARV\' ';
					obj.sql.filterRealistic = obj.sql.idFull + ' > 0 ';
					break;
				case 'ArLeave':
					obj.sql.field 	= 'samp_oxy';
					obj.sql.table 	= 'ms_heat_celox';
					obj.sql.db 			= 'USSGLW.dbo';
					obj.sql.filterLocal =
						'  and fac_id = \'A\' \n' +
						'  and samp_designation = \'LV\' ';
					obj.sql.filterRealistic = obj.sql.idFull + ' > 0 ';
					break;
				case 'RHArrive':
					obj.sql.field 	= 'samp_oxy';
					obj.sql.table 	= 'ms_heat_celox';
					obj.sql.db 			= 'USSGLW.dbo';
					obj.sql.filterLocal =
						'  and fac_id = \'V\' \n' +
						'  and samp_designation = \'ARV\' ';
					obj.sql.filterRealistic = obj.sql.idFull + ' > 0 ';
					break;
				case 'RHDeox':
					obj.sql.field 	= 'samp_oxy';
					obj.sql.table 	= 'ms_heat_celox';
					obj.sql.db 			= 'USSGLW.dbo';
					obj.sql.filterLocal =
						'  and fac_id = \'V\' \n' +
						'  and samp_designation = \'DX\' ';
					obj.sql.filterRealistic = obj.sql.idFull + ' > 0 ';
					break;
				case 'RHLeave':
					obj.sql.field 	= 'samp_oxy';
					obj.sql.table 	= 'ms_heat_celox';
					obj.sql.db 			= 'USSGLW.dbo';
					obj.sql.filterLocal =
						'  and fac_id = \'V\' \n' +
						'  and samp_designation = \'LV\' ';
					obj.sql.filterRealistic = obj.sql.idFull + ' > 0 ';
					break;
				default:
					break;
			}
			break;
		case 'ChargeDTS':
			obj.sql.idFull 	= (idMain).fieldWrapAdd();
			obj.title 	= idMain;
			obj.type 		= 'datetime';
			obj.unit 		= '';
			obj.format 	= '%m/%d/%Y';
			obj.sql.field = 'chrg_dt';
			obj.sql.table = 'bop_ht';
			obj.sql.db 		= 'USSGLW.dbo';
			break;
		case 'TapO2':
			obj.sql.idFull 	= (idMain).fieldWrapAdd();
			obj.title 	= idMain;
			obj.type 		= 'linear';
			obj.unit 		= 'ppm';
			obj.format 	= '.f';
			obj.decimals 	= 0;
			obj.sql.field 	= 'tap_oxy';
			obj.sql.table 	= 'bop_ht';
			obj.sql.db 		= 'USSGLW.dbo';
			break;
		case 'Mg90':
			obj.sql.idFull 	= (idMain).fieldWrapAdd();
			obj.title 	= idMain;
			obj.type 		= 'linear';
			obj.unit 		= 'lbs';
			obj.format 	= '.f';
			obj.decimals 	= 0;
			obj.sql.field 	= 'dslf_act_Mg90_wt';
			obj.sql.table 	= 'bop_ht';
			obj.sql.db 		= 'USSGLW.dbo';
			break;
		case 'Mg90Replunge':
			obj.sql.idFull 	= (idMain).fieldWrapAdd();
			obj.title 	= idMain;
			obj.type 		= 'linear';
			obj.unit 		= 'lbs';
			obj.format 	= '.f';
			obj.decimals 	= 0;
			obj.sql.field 	= 'dslf_act_rplng_Mg90_wt';
			obj.sql.table 	= 'bop_ht';
			obj.sql.db 		= 'USSGLW.dbo';
			break;
		case 'DsfSkimWt':
			obj.sql.idFull 	= (idMain).fieldWrapAdd();
			obj.title 	= idMain;
			obj.type 		= 'linear';
			obj.unit 		= 'lbs';
			obj.format 	= '.f';
			obj.decimals 	= 0;
			obj.sql.field 	= 'hm_skim_loss_wt';
			obj.sql.table 	= 'bop_ht';
			obj.sql.db 		= 'USSGLW.dbo';
			break;
		case 'RecycleWt':
			obj.sql.idFull = (idMain).fieldWrapAdd();
			obj.title 	= 'Recycled Steel';
			obj.type 		= 'linear';
			obj.unit 		= 'lbs';
			obj.format 	= '.f';
			obj.decimals 	= 0;
			obj.sql.field 	= 'recycled_wt';
			obj.sql.table 	= 'bop_recycled_ht';
			obj.sql.db 		= 'USSGLW.dbo';
			obj.sql.joinType = 'left outer join';
			break;
		case 'TapDur':
			obj.sql.idFull = (idMain).fieldWrapAdd();
			obj.title 	= 'Tap Duration';
			obj.type 		= 'linear';
			obj.unit 		= 'minutes';
			obj.format 	= '.1f';
			obj.decimals 	= 1;
			obj.sql.field 	= 'tap_dur';
			obj.sql.table 	= 'bop_ht';
			obj.sql.db 		= 'USSGLW.dbo';
			break;
		case 'Vessel':
			var vessel 	= params[0];
			obj.sql.idFull 	= (idMain + ' ' + vessel).fieldWrapAdd();
			obj.title 	= idMain;
			obj.type 		= 'text';
			obj.unit 		= '';
			obj.format 	= '.f';
			obj.decimals 	= 0;
			obj.sql.field 	= 'null';
			obj.sql.table 	= 'bop_ht';
			obj.sql.db 		= 'USSGLW.dbo';
			obj.sql.filterLocal = '  and substring(ht_num, 1, 2) = \'' + vessel + '\' ';
			obj.disableOperator = true;
			break;
		// case 'Grade':
		// 	var vessel 	= params[0];
		// 	obj.sql.idFull 	= (idMain).fieldWrapAdd();
		// 	obj.title 	= idMain;
		// 	obj.type 		= 'text';
		// 	obj.unit 		= '';
		// 	obj.format 	= '.f';
		// 	obj.decimals 	= 0;
		// 	obj.sql.field 	= 'null';
		// 	obj.sql.table 	= 'bop_ht';
		// 	obj.sql.db 		= 'USSGLW.dbo';
		// 	obj.disableOperator = true;
		// 	break;
		case 'Degasser':
			var option 	= params[0];
			switch (option) {
				case 'RHSlagDepth':
					obj.sql.idFull = (idMain + ' ' + option).fieldWrapAdd();
					obj.title 	= 'RH Freeboard';
					obj.type 		= 'linear';
					obj.unit 		= 'inches';
					obj.format 	= '.f';
					obj.decimals 	= 0;
					obj.sql.field 	= 'meas_slag_dpth';
					obj.sql.table 	= 'degas_ht';
					obj.sql.db 		= 'USSGLW.dbo';
					break;
				case 'RHFreeboard':
					obj.sql.idFull = (idMain + ' ' + option).fieldWrapAdd();
					obj.title 	= 'RH Freeboard';
					obj.type 		= 'linear';
					obj.unit 		= 'inches';
					obj.format 	= '.f';
					obj.decimals 	= 0;
					obj.sql.field 	= 'freeboard';
					obj.sql.table 	= 'degas_ht';
					obj.sql.db 		= 'USSGLW.dbo';
					break;
				case 'RHFinalStir':
					obj.sql.idFull = (idMain + ' ' + option).fieldWrapAdd();
					obj.title 	= 'RH Final Stir Time';
					obj.type 		= 'linear';
					obj.unit 		= 'heats';
					obj.format 	= '.f';
					obj.decimals 	= 0;
					obj.sql.field 	= 'fin_stir_time';
					obj.sql.table 	= 'degas_ht';
					obj.sql.db 		= 'USSGLW.dbo';
					break;
				case 'RHHtsOnSnorkel':
					obj.sql.idFull = (idMain + ' ' + option).fieldWrapAdd();
					obj.title 	= 'RH Heats On Snorkel';
					obj.type 		= 'linear';
					obj.unit 		= 'heats';
					obj.format 	= '.f';
					obj.decimals 	= 0;
					obj.sql.field 	= 'num_hts_on';
					obj.sql.table 	= 'degas_ht_equip_usage';
					obj.sql.db 		= 'USSGLW.dbo';
					obj.sql.filterLocal = '  and degas_ht_equip_usage.equip_cd = \'UPSNKL\' ';
					break;
				default:
					break;
			}
			break;
		default:
			break;		
	}


	(obj.sql.field === undefined) ? (obj.sql.field = '') : (null);
	(obj.sql.table=== undefined) ? (obj.sql.table = '') : (null);
	(obj.sql.db === undefined) ? (obj.sql.db = '') : (null);
	(obj.sql.filterLocal === undefined) ? (obj.sql.filterLocal = '') : (obj.sql.filterLocal += ' \n');
	(obj.sql.filterRealistic === undefined) ? (obj.sql.filterRealistic = '') : (obj.sql.filterRealistic += ' \n');
	(obj.sql.joinType === undefined) ? (obj.sql.joinType = 'inner join') : (null);
	(obj.disableOperator === undefined) ? (obj.disableOperator = false) : (null);

	return obj;
}

//================================================================
//===  _master.js  ============================================
//=========================================================

foo();
function foo() {

}


var mMaster = {
	sql: {},
	x: {
		target: '#options-x',
		sql: {
			subName: 'subX'
		}
	},
	y: {
		target: '#options-y',
		sql: {
			subName: 'subY'
		}
	},
	moreFilters: {
		eachFilter: [],
		sql: {}
	}
};

var mSQL = {};

var mOptions = {};

var mMoreFilters = {};

var mChart = {};




$(document).ready( function() {
	mOptions.init();
	mMoreFilters.init();
});



mMaster.submitHandle = function() {
	g.error = false;

	// Validate modules
	mOptions.validate();
	mMoreFilters.validate();
	if (g.error === true) {
		return false;
	}

	// Prepare modules
	mMaster.prepareModuleOptions();
	mMaster.prepareModuleMoreFilters();

	// mMaster.createMainQuery();
	mMaster.sql.mainQuery = mSQL.mainQueryBuild(mMaster);
	console.log(mMaster.sql.mainQuery);
	console.log(mMaster);

	// mSQL.runQuery(mMaster.sql.mainQuery);
	
	// console.log(mMaster.y.sql.filterRealistic);
	// console.log(mMaster.y.sql.filterRealisticArray);
	// console.log(mMaster.y.sql.query);
	// console.log(mMaster.sql.mainQuery);
};



mMaster.prepareModuleMoreFilters = function() {
	'use strict';

	mMoreFilters.getFromDOM();

	createFilters();

	createSubQueries();

	mMaster.moreFilters = mMoreFilters;


	function createFilters() {
		$.each(mMoreFilters.eachFilter, function( index, value ) {
			mMoreFilters.eachFilter[index].sql.filter = get(value);
		});

		function get(obj) {
			var subName = obj.sql.subName;
			var idFull = obj.sql.idFull;
			var operator = obj.operator;
			var input1 = $(obj.target + ' .input1').val();
			var input2 = $(obj.target + ' .input2').val();
			var joinType = obj.sql.joinType;

			var filter = mSQL.createSingleFilter(subName, idFull, operator, input1, input2, joinType);

			return filter;
		}
	}

	function createSubQueries() {
		var obj = {};

		$.each(mMoreFilters.eachFilter, function( index, value ) {
			obj = mSQL.subQueryBuild(value.sql.idFull, mMaster.sql.filterGlobal);
			mMoreFilters.eachFilter[index].sql.query = obj.sql.query;
		});

		// obj = mSQL.subQueryBuild(mMaster.x.sql.idFull, mMaster.sql.filterGlobal);
		// mMaster.x.sql = $.extend(true, {}, mMaster.x.sql, obj.sql);
	}
};




mMaster.prepareModuleOptions = function() {
	'use strict';

	$.extend(mMaster, mOptions.getFromDOM());

	filters();

	subQueries();


	return true;


	function filters() {
		var centralTable = mMaster.x.sql.centralTable;
		var centralDate = mMaster.x.sql.centralTableDate;
		var timeMin = mMaster.timeMin;
		var timeMax = mMaster.timeMax;
		mMaster.x.sql.filter = createFilter(mMaster.x);
		mMaster.y.sql.filter = createFilter(mMaster.y);
		mMaster.sql.filterDate = mSQL.createSingleFilter(centralTable, centralDate, null, timeMin, timeMax, null);

		var tap_yr = timeMin.substr(timeMin.length - 2);
		mMaster.sql.filterGlobal = 'tap_yr >= \'' + tap_yr + '\' \n';


		if (mMaster.tapGrade !== '') {
			mMaster.sql.filterGrade = 'tap_grd like \'' + mMaster.tapGrade + '\' \n';
		} else {
			mMaster.sql.filterGrade = '';
		}


		function createFilter(obj) {
			var subName = obj.sql.subName;
			var idFull = obj.sql.idFull;
			var operator = null;
			var input1 = $(obj.target + " .min").val();
			var input2 = $(obj.target + " .max").val();
			var joinType = obj.sql.joinType;

			var filter = mSQL.createSingleFilter(subName, idFull, operator, input1, input2, joinType);

			return filter;
		}
	}


	function subQueries() {
		var obj = {};

		obj = mSQL.subQueryBuild(mMaster.x.sql.idFull, mMaster.sql.filterGlobal);
		mMaster.x.sql = $.extend(true, {}, mMaster.x.sql, obj.sql);

		obj = mSQL.subQueryBuild(mMaster.y.sql.idFull, mMaster.sql.filterGlobal);
		mMaster.y.sql = $.extend(true, {}, mMaster.y.sql, obj.sql);
	}

};




mMaster.createSubQueries = function() {
	var obj = {};

	obj = mSQL.subQueryBuild(mMaster.x.sql.idFull, mMaster.sql.filterGlobal);
	mMaster.x.sql = $.extend(true, {}, mMaster.x.sql, obj.sql);

	obj = mSQL.subQueryBuild(mMaster.y.sql.idFull, mMaster.sql.filterGlobal);
	mMaster.y.sql = $.extend(true, {}, mMaster.y.sql, obj.sql);
};


mMaster.createOptionsFilters = function(obj) {
	var centralTable = mMaster.x.sql.centralTable;
	var centralDate = mMaster.x.sql.centralTableDate;
	var timeMin = mMaster.timeMin;
	var timeMax = mMaster.timeMax;
	mMaster.x.sql.filter = get(mMaster.x);
	mMaster.y.sql.filter = get(mMaster.y);
	mMaster.sql.filterDate = mSQL.createSingleFilter(centralTable, centralDate, null, timeMin, timeMax, null);

	var tap_yr = timeMin.substr(timeMin.length - 2);
	mMaster.sql.filterGlobal = 'tap_yr >= \'' + tap_yr + '\' \n';


	function get(obj) {
		var subName = obj.sql.subName;
		var idFull = obj.sql.idFull;
		var operator = null;
		var input1 = $(obj.target + " .min").val();
		var input2 = $(obj.target + " .max").val();
		var joinType = obj.sql.joinType;

		var filter = mSQL.createSingleFilter(subName, idFull, operator, input1, input2, joinType);

		return filter;
	}


};









//================================================================
//===  sql.js  ================================================
//==========================================================



mSQL.runQuery = function(query) {
	'use strict';
	var urlQuery = '';

	if (g.OS === 'windows') {
		urlQuery = 'php/query_windows.php';
	} else if (g.OS === 'linux') {
		urlQuery = 'php/query_linux.php';
	}


	$.ajax({
		type: 'POST',
		url: urlQuery,
		data: {
			'input' : JSON.stringify(query)
		},
		dataType: 'json',
		success: function(results) {
			if (results.length > g.maxRows) {
				alert(
					'Too many results. Please narrow your search. \n\n' +
					'Results: ' + results.length + ' heats \n' +
					'Max: ' + g.maxRows + ' heats \n'
				);
			}


	
			mOptions.toggleSubmitBtn('enable');
		},
		error: function(results) {

			alert(
				'ERROR: AJAX/PHP/SQL issue. \n\n' +
				'This error isn\'t your fault. Please email a screenshot of this web page to Aaron Harper at amharper@uss.com.'
			);

			console.log(mMaster.sql.mainQuery);

			mOptions.toggleSubmitBtn('enable');
	  }
	 });


	function formatResults(results) {
		var rowPrev = [];
		var x, y, heatID, roundX, roundY, roundYcount, roundYstdev;
		x = y = heatID = roundX = roundY = roundYcount = roundYstdev = '';
		mMaster.data = {
			heats: [],
			averages: []
		};


		$.each(results, function( index, row ) {

			rowPrev = [];
			if (index > 0) {
				rowPrev = results[index-1];
			}

			if (mMaster.x.type === 'datetime') {
				x = Date.parse(row[0]);
				roundX = Date.parse(row[3]);
			} else {
				x = parseFloat(row[0], 4);  //Fix Bug: Decimals showing as strings.
				roundX = parseFloat(row[3], 4);  //Fix Bug: Decimals showing as strings.
			}

			y = parseFloat(row[1], 4);  //Fix Bug: Decimals showing as strings.
			heatID = row[2];
			roundY = parseFloat(row[4], 4);  //Fix Bug: Decimals showing as strings.
			roundYcount = row[5];
			roundYstdev = parseFloat(row[6], 1);  //Fix Bug: Decimals showing as strings.

			mMaster.data.heats.push( { x: x, y: y, info: heatID } );

			if ($.isNumeric(roundX)) {
				if (index === 0) {
					mMaster.data.averages.push( { x: roundX, y: roundY, info1: roundYcount, info2: roundYstdev } );
				} else if ( (row[3] !== rowPrev[3])  ||  (row[4] !== rowPrev[4]) ) {
					mMaster.data.averages.push( { x: roundX, y: roundY, info1: roundYcount, info2: roundYstdev } );
				}
			}

		});
	}
};



mSQL.mainQueryBuild = function(obj) {
	'use strict';
	var query, x, y, heat, roundX, roundYavg, roundYcount, roundYstdev, filter, queryMoreFilters;
	query = x = y = heat = roundX = roundYavg = roundYcount = roundYstdev = filter = queryMoreFilters = '';
	var centralTable = obj.x.sql.centralTable;
	var centralDB = obj.x.sql.centralDB;
	var centralTableHeat = obj.x.sql.centralTableHeat;
	var filterGlobal = obj.sql.filterGlobal;

	if (obj.x.sql.joinType === 'left outer join') {
		x = 'isNull(subX.' + obj.x.sql.idFull + ', 0) as x';
	} else {
		x = 'subX.' + obj.x.sql.idFull + ' as x';
	}

	if (obj.y.sql.joinType === 'left outer join') {
		y = 'isNull(subY.' + obj.y.sql.idFull + ', 0) as y';
	} else {
		y = 'subY.' + obj.y.sql.idFull + ' as y';
	}

	heat = centralTable + '.' + centralTableHeat + ' as heat';

	if (obj.x.round !== null  &&  obj.x.type === 'datetime') {
		roundX = 'dateadd(' + obj.x.round + ', datediff(' + obj.x.round + ', 0, ' + obj.x.sql.idFull + '), 0) as roundX';
		roundYavg = 'avg(y) over(partition by roundX) as roundYavg';
		roundYcount = 'count(y) over(partition by roundX) as roundYcount';
		roundYstdev = 'stdev(y) over(partition by roundX) as roundYstdev';
	} else if (obj.x.round !== null  &&  obj.x.type === 'linear') {
		roundX = obj.x.round + '*round(' + obj.x.sql.idFull + '/' + obj.x.round + ', 0) as roundX';
		roundYavg = 'avg(y) over(partition by roundX) as roundYavg';
		roundYcount = 'count(y) over(partition by roundX) as roundYcount';
		roundYstdev = 'stdev(y) over(partition by roundX) as roundYstdev';
	} else {
		roundX = 'null as roundX';
		roundYavg = 'null as roundYavg';
		roundYcount = 'null as roundYcount';
		roundYstdev = 'null as roundYstdev';
	}

	obj.x.sql.query = mSQL.indent(obj.x.sql.query, '    ');
	obj.y.sql.query = mSQL.indent(obj.y.sql.query, '    ');

	queryMoreFilters = prepareMoreFiltersQuery();
	filter = prepareFilters(obj);

	query =
		'select \n' +
		'  x, y, heat, roundX, ' + roundYavg + ', ' + roundYcount + ', ' + roundYstdev + ' \n' +
		'from( \n' +
		'  select \n' +
		'    ' + x + ', ' + y + ', ' + heat + ', ' + roundX + ' \n' + 
		'  from ' + centralDB + '.' + centralTable + ' ' + centralTable + ' \n' +
		'  ' + obj.x.sql.joinType + '( \n' +
		obj.x.sql.query +
		'  ) subX \n' +
		'    on bop_ht.ht_num = subX.ht_num \n' +
		'      and bop_ht.tap_yr = subX.tap_yr \n' +
		'  ' + obj.y.sql.joinType + '( \n' +
		obj.y.sql.query +
		'  ) subY \n' +
		'    on bop_ht.ht_num = subY.ht_num \n' +
		'      and bop_ht.tap_yr = subY.tap_yr \n' +
		queryMoreFilters +
		'  where ' + mMaster.sql.filterDate +
		filter +
		') sub \n' +
		'where \n' +
		'  x is not null \n' +
		'  and y is not null \n' +
		'order by x asc';

	return query;


	function prepareMoreFiltersQuery() {
		var query, centralTable, subName;
		var joinKeyArray = [];
		query = centralTable = subName = '';

		joinKeyArray = mMaster.x.sql.joinKeyArray;
		centralTable = mMaster.x.sql.centralTable;

		$.each(mMoreFilters.eachFilter, function( index, value ) {
			subName = value.sql.subName;
			query += value.sql.joinType + '( \n' +
				mSQL.indent(value.sql.query, '  ') +
				') ' + value.sql.subName + ' \n' +
				mSQL.createJoinOn(joinKeyArray, centralTable, subName);
		});

		query = mSQL.indent(query, '  ');
		return query;
	}


	function prepareFilters(obj) {
		var bigFilter = '';



		bigFilter = 
			prefixAnd( obj.x.sql.filter ) +
			prefixAnd( prefixSubName(obj.x.sql.subName, obj.x.sql.filterRealistic) ) +
			prefixAnd( obj.y.sql.filter ) +
			prefixAnd( prefixSubName(obj.y.sql.subName, obj.y.sql.filterRealistic) ) +
			// '';
			prefixAnd( prefixSubName(mMaster.x.sql.centralTable, mMaster.sql.filterGrade) );


		$.each(mMoreFilters.eachFilter, function( index, value ) {
			bigFilter += prefixAnd(value.sql.filter);
			bigFilter += prefixAnd( prefixSubName(value.sql.subName, value.sql.filterRealistic) );
		});

		bigFilter = mSQL.indent(bigFilter, '    ');

		return bigFilter;


		function prefixSubName(subName, filter) {
			if (filter !== '') {
				filter = subName + '.' + filter;
			}

			return filter;
		}

		function prefixAnd(filter) {
			if (filter !== '') {
				filter = 'and ' + filter;
			}

			return filter;
		}
	}
};



mSQL.subQueryBuild = function(idFull, filterGlobal, queryDepth) {
	'use strict';
	if (queryDepth === undefined) { queryDepth = 1; } else { queryDepth += 1; }
	var query, subQuery, selectPrefix, field, filter, subName, idMain, joinType, joinOn;
	query = subQuery = selectPrefix = field = filter = subName = idMain = joinType = joinOn = '';
	var subFields = [], filterRealisticArray = [], params = [], paramsNames = [], idSplit = [];
	var calcField = null;
	var obj = {}, sql = {};

	// Clean up and separate.
	idSplit = idFull.fieldWrapDelete().split(' ');
	// The actual id is only the first "word."
	idMain = idSplit[0];
	params = [];
	$.each(idSplit, function( index, value ) {
		if (index > 0) {
			params.push(value);
		}
	});
	paramsNames = params;

	obj = getDefinitions(idMain, params, paramsNames);
	field = obj.sql.field;

	subFields = field.fieldWrapToArray();
	if (subFields.length > 0) { calcField = true; } else { calcField = false; }
	if ( (queryDepth === 1)  &&  (calcField === false) ) {
		subName = null;
		selectPrefix = mSQL.createSelectPrefix(obj.sql.joinKeyArray, subName);
		query = 'select ' + selectPrefix + ', ' + obj.sql.field + ' as ' + idFull + ' \n' +
						'from ' + obj.sql.db + '.' + obj.sql.table + ' \n' +
						'where ' + filterGlobal;

		if (obj.sql.filterLocal !== '') {
			query += obj.sql.filterLocal;
		}

	} else if (calcField === true) {
		subName = 'sub1';
		selectPrefix = mSQL.createSelectPrefix(obj.sql.joinKeyArray, subName);
		query = 'select ' + selectPrefix + ', ' + obj.sql.field + ' as ' + idFull + ' \n' +
						'from( \n';

		sql = obj.sql;  // Temporarily store obj.sql so that it can be reset after handing subqueries in the $.each() loop below.

		$.each(subFields, function( index, idFull ) {
			// Clean up and separate.
			idSplit = idFull.fieldWrapDelete().split(' ');
			// The actual id is only the first "word."
			idMain = idSplit[0];
			params = [];
			$.each(idSplit, function( index, value ) {
				if (index > 0) {
					params.push(value);
				}
			});
			paramsNames = params;	
			subName = 'sub' + (index + 1);

			obj = getDefinitions( idMain, params, null );

			subQuery = mSQL.subQueryBuild(idFull, filterGlobal, queryDepth).sql.query;
			subQuery = mSQL.indent(subQuery, '  ');

			if (index === 0) {
				joinType = '';
				joinOn = '';
			} else {
				joinType = obj.sql.joinType + '( \n'; 
				joinOn = mSQL.createJoinOn(obj.sql.joinKeyArray, 'sub1', subName);
			}


			filterRealisticArray.push(obj.sql.filterRealistic);


			query +=
				joinType +
				subQuery +
				') ' + subName + ' \n' +
				joinOn;
		});

		$.each(filterRealisticArray, function(index, value) {
			subName = 'sub' + (index + 1);
			if (value.length > 0) {
				if (filter.substr(0, 5) !== 'where') {
					filter +=
						'where \n' +
						'  ';
				} else {
					filter += '  and ';
				}
				filter += subName + '.' + value;
			}
			
		});

		obj.sql = sql;  // Restore obj.sql
		query += filter;

	} else if ( (queryDepth > 1)  &&  (calcField === false) ) {
		subName = null;
		selectPrefix = mSQL.createSelectPrefix(obj.sql.joinKeyArray, subName);
		query = 'select ' + selectPrefix + ', ' + obj.sql.field + ' as ' + idFull + ' \n' +
						'from ' + obj.sql.db + '.' + obj.sql.table + ' \n' +
						'where ' + filterGlobal;

		if (obj.sql.filterLocal !== '') {
			query += obj.sql.filterLocal;
		}
	}


	obj.sql.query = query;

	return obj;
};



mSQL.createSelectPrefix = function(joinKeyArray, table) {
	'juse strict';
	var selectPrefix = '';

	if (joinKeyArray.length === 0) { return selectPrefix; }

	$.each(joinKeyArray, function( index, value ) {
		if (table === null) {
			selectPrefix += value;
		} else {
			selectPrefix += table + '.' + value;
		}
		if ( index !== (joinKeyArray.length - 1) ) { selectPrefix += ', '; }
	});
	return selectPrefix;
};



mSQL.createJoinOn = function(joinKeyArray, subNameMain, subNameThis) {
	'use strict';
	var joinOn = '';

	if (joinKeyArray.length === 0) { return joinOn; }

	joinOn += '  on ';
	$.each(joinKeyArray, function( index, value ) {
		if (index > 0) { joinOn += '    and '; }
		joinOn += subNameMain + '.' + value + ' = ' + subNameThis + '.' + value + ' \n';
	});

	return joinOn;
};



mSQL.indent = function(str, indent) {
	'use strict';

	if (str === '') {
		return str;
	}

	var arr = str.split('\n');
	str = '';

	if (arr.length === 1) {
		str = indent + arr[0] + '\n';
	} else {
		$.each(arr, function( index, value ) {
			if ( index < (arr.length - 1) ) {
				str += indent + value + '\n';
			}
		});
	}

	return str;
};



mSQL.createSingleFilter = function(subName, idFull, operator, input1, input2, joinType) {
	'use strict';
	var filter = '';

	if (joinType === 'left outer join') {
		idFull = 'isNull(' + subName + '.' + idFull + ', 0)';
	} else {
		idFull = subName + '.' + idFull;
	}

	switch (operator) {
		case null:
			filter = '';
			if ( (input1)  &&  (input2) ) {
				filter = idFull + ' between \'' + input1 + '\' and \'' + input2 + '\' \n';
			} else if (input1) {
				filter = idFull + ' >= \'' + input1 + '\' \n';
			} else if (input2) {
				filter = idFull + ' <= \'' + input2 + '\' \n';
			} else {
				filter = '';
			}
			break;
		case 'between':
			filter = idFull + ' between \'' + input1 + '\' and \'' + input2 + '\' \n';
			break;
		case 'notBetween':
			filter = idFull + ' not between \'' + input1 + '\' and \'' + input2 + '\' \n';
			break;
		case '>=':
			filter = idFull + ' >= \'' + input1 + '\' \n';
			break;
		case '<=':
			filter = idFull + ' <= \'' + input1 + '\' \n';
			break;
		case '=':
			filter = idFull + ' = \'' + input1 + '\' \n';
			break;
		case '!=':
			filter = idFull + ' != \'' + input1 + '\' \n';
			break;
		default:
			break;
	}


	return filter;
};
//================================================================
//===  options.js  ============================================
//=========================================================


mOptions.init = function() {
	'use strict';
	mOptions.toggleSubmitBtn('disable', 'Loading...');

	mOptions.x = {
		target: '#options-x',
		sql: {
			subName: 'subX'
		}
	};

	mOptions.y = {
		target: '#options-y',
		sql: {
			subName: 'subY'
		}
	};


	var date30DaysAgo = moment().subtract(30, 'days').format('M/D/YY');
	$('#options-filter .dataRange .min').val(date30DaysAgo);


	watch();

	$('#m-options #options-x .field').change();
	$('#m-options #options-y .field').change();

	mOptions.toggleSubmitBtn('enable');


	function watch() {
		$("#m-options select").change( function() {
			mOptions.update( $(this) );
		});

		$("#generate").click( function() {
			mOptions.toggleSubmitBtn('disable', 'Loading...');

			mMaster.submitHandle();

			mOptions.toggleSubmitBtn('enable');
		});

	}

	return true;
};



mOptions.update = function(changedElem) {
	'use strict';
	var changedElemClass = changedElem.attr('class');
	var target = '#m-options #' + $(changedElem).closest('div').attr('id');
	var selection = $(target + ' .' + changedElemClass).val();
	var idMain = selection;
	var type = getDefinitions(idMain, null, null).type;


	// If the field isn't a number, hide the data range options.
	if (type != 'linear') {
		$(target + ' .min').val('');
		$(target + ' .max').val('');
		$(target + ' .dataRange').hide();
	} else {
		$(target + ' .dataRange').show();
	}

	if ($(changedElem).closest('div').attr('class') === 'fieldExpand') {
		target = '#m-options #' + changedElem.parent().parent().attr('id') + ' .fieldExpand';
		selection = $(target + ' .' + changedElemClass).val();
		idMain = $('#m-options #' + changedElem.parent().parent().attr('id') + ' .field').val();
		changedElemClass = 'fieldExpand';
	}

	switch ( changedElemClass ) {
		case 'field':
			idMain = selection;
			$(target + ' .fieldExpand select').prop('disabled', false);

			if (type != 'linear') {
				$(target + ' .min').val('');
				$(target + ' .max').val('');
				$(target + ' .dataRange').hide();
			} else {
				$(target + ' .dataRange').show();
			}

			fieldExpandCreate(idMain, target);
			break;
		case 'fieldExpand':
			toggleSulfurLock(idMain, target);
			break;
		default:
			break;
	}



	return true;
};



mOptions.validate = function() {
	var idMain = '';
	var type = '';
	var round = '';
	var msg = '';
	var min = null;
	var max = null;


	runTests('#options-x');
	runTests('#options-y');
	runTests('#options-filter');

	return true;

	
	function runTests(target) {
		if (target === '#options-filter') {  // If testing the filter section.
			type = 'datetime';
		} else {  // If testing the axis sections.
			idMain = $(target + " .field option:selected").val();
			type = getDefinitions(idMain, null, null).type;
		}


		// Validate data range
		if (type === 'linear') {
			min = nullIfBlank($(target + " .min").val());
			max = nullIfBlank($(target + " .max").val());

			if ( (min)  &&  (!$.isNumeric(min)) ) {
				msg =
					'ERROR: Invalid number.\n\n' +
					'You entered: \'' + min + '\'\n' +
					'Correct format: numeric.';
				g.errorFunc(msg);
				return false;
			} else if ( (max)  &&  (!$.isNumeric(max)) ) {
				msg =
					'ERROR: Invalid number.\n\n' +
					'You entered: \'' + max + '\'\n' +
					'Correct format: numeric.';
				g.errorFunc(msg);
				return false;
			}
		} else if (type === 'datetime') {
			min = nullIfBlank($(target + " .min").val());
			max = nullIfBlank($(target + " .max").val());

			if ( (min)  &&  (!Date.parse(min)) ) {
				msg =
					'ERROR: Invalid date.\n\n' +
					'You entered: \'' + min + '\'\n' +
					'Correct format: m/d/yy. For example, 4/23/15 is properly formatted.';
				g.errorFunc(msg);
				return false;
			} else if ( (max)  &&  (!Date.parse(max)) ) {
				msg =
					'ERROR: Invalid date.\n\n' +
					'You entered: \'' + max + '\'\n' +
					'Correct format: m/d/yy. For example, 4/23/15 is properly formatted.';
				g.errorFunc(msg);
				return false;
			}
		}


		// Validate rounding input.
		round = nullIfBlank( $(target + " .round input").val() );  // Get the rounding factor.
		if ( (round)  &&  (type === 'datetime') ) {  // If there's a rounding input and it's a date.
			if ( (round != 'day')  &&  (round != 'week')  &&  (round != 'month')  &&  (round != 'year') ){
				msg =
					'ERROR: Invalid rounding factor.\n\n' +
					'You entered \'' + round + '\'\n' +
					'Acceptable options: day, week, month and year.';
				g.errorFunc(msg);
				return false;
			}
		} else if ( (round)  &&  (type === 'linear') ) {  // If there's a rounding input and it's a number.
			if ( !$.isNumeric(round) ) {
				msg =
					'ERROR: Invalid rounding factor.\n\n' +
					'You entered \'' + round + '\'\n' +
					'Acceptable options: numeric.';
				g.errorFunc(msg);
				return false;
			}
		}


		return true;
	}
};



mOptions.getFromDOM = function() {
	var selectsArray = [];


	mOptions.x = $.extend(true, {}, mOptions.x, get(mOptions.x));
	mOptions.y = $.extend(true, {}, mOptions.y, get(mOptions.y));

	mOptions.timeMin = nullIfBlank($('#options-filter .dataRange .min').val());
	mOptions.timeMax = nullIfBlank($('#options-filter .dataRange .max').val());
	mOptions.tapGrade = nullIfBlank($('#options-filter .tapGrade input').val());


	function get(obj) {
		var target = obj.target;
		obj.min = nullIfBlank($(target + ' .min').val());
		obj.max = nullIfBlank($(target + ' .max').val());

		if (target === '#options-x') {
			obj.round = nullIfBlank($(target + ' .round input').val());
		}

		obj.idMain = $(target + ' .field option:selected').val();

		//
		obj.paramsVal = [];
		obj.paramsText = [];
		selectsArray = $(target + ' .fieldExpand').find('select');
		$.each(selectsArray, function( index, value ) {
			var selectClass = $(value).attr("class");
			var val = $(target + ' .fieldExpand .' + selectClass + ' option:selected').val();
			var text = $(target + ' .fieldExpand .' + selectClass + ' option:selected').text();
			obj.paramsVal.push(val);
			obj.paramsText.push(text);
		});

		obj = $.extend(true, {}, obj, getDefinitions(obj.idMain, obj.paramsVal, obj.paramsText));

		return obj;
	}

	return {
		x: mOptions.x,
		y: mOptions.y,
		timeMin: mOptions.timeMin,
		timeMax: mOptions.timeMax,
		tapGrade: mOptions.tapGrade
	};
};



mOptions.toggleSubmitBtn = function(toggle, text) {
	var defaultText = 'Generate Chart';
	if (text === undefined) {
		text = defaultText;
	}
	switch (toggle) {
		case 'disable':
			$('#m-options #generate').prop('disabled', true);
			$('#m-options #generate').val(text);
			break;
		case 'enable':
			$('#m-options #generate').prop('disabled', false);
			$('#m-options #generate').val(defaultText);
			break;
		default:
			break;
	}
	return true;
};
//================================================================
//===  moreFilters.js  ========================================
//==========================================================


mMoreFilters.init = function() {
	'use strict';
	$('#m-moreFilters .fieldExpand span').hide();
	$('#m-moreFilters .fieldExpand select').hide();
	$('#m-moreFilters .operator').hide();
	$('#m-moreFilters .range').children().hide();

	mMoreFilters.eachFilter = [];



	watch();


	function watch() {
		$('#m-moreFilters select').change( function() {
			mMoreFilters.update( $(this) );
		});
	}

};



mMoreFilters.update = function(changedElem) {
	'use strict';
	var changedElemClass = changedElem.attr('class');
	var target = '#m-moreFilters #' + $(changedElem).closest('div').attr('id');
	var selection = $(target + ' .' + changedElemClass).val();
	var idMain = '';
	var disableOperator = false;

	if ($(changedElem).closest('div').attr('class') === 'fieldExpand') {
		target = '#m-moreFilters #' + changedElem.parent().parent().attr('id') + ' .fieldExpand';
		selection = $(target + ' .' + changedElemClass).val();
		idMain = $('#m-moreFilters #' + changedElem.parent().parent().attr('id') + ' .field').val();
		changedElemClass = 'fieldExpand';
	}

	switch ( changedElemClass ) {
		case 'field':
			idMain = selection;
			disableOperator = getDefinitions(idMain, null, null).disableOperator;
			$(target + ' .fieldExpand select').prop('disabled', false);

			if ( (selection === 'N/A')  ||  (disableOperator) ) {
				$(target + ' .operator').hide();
				$(target + ' .range').children().hide();
			} else {
				$(target + ' .operator').show();
				$(target + ' .range .input1').show();
			}
			fieldExpandCreate(idMain, target);
			break;
		case 'operator':
			if (selection == 'between'  ||  selection == 'notBetween') {
				$(target + " .range").children().show();
			} else {
				$(target + ' .range .input1').show();
				$(target + ' .range .and').hide();
				$(target + ' .range .input2').hide();
			}
			break;
		case 'fieldExpand':
			toggleSulfurLock(idMain, target);
			break;
		default:
			break;
	}


	return true;
};



mMoreFilters.validate = function() {
	'use strict';
	var activeFiltersArray = $('#m-moreFilters').find('input:visible');

	$.each(activeFiltersArray, function( index, value ) {
		var inputContent = $(value).val();
		if (inputContent === '') {
			var msg =
				'ERROR: Missing input.\n\n' +
				'There\'s an empty input box in the \'More Filters\' section.';
			g.errorFunc(msg);
			return false;
		} else if ( !$.isNumeric(inputContent) ) {
			var msg =
				'ERROR: Invalid number.\n\n' +
				'You entered: \'' + inputContent + '\'\n' +
				'Correct format: numeric.';
			g.errorFunc(msg);
			return false;
		}
	});

	return true;
};



mMoreFilters.getFromDOM = function() {
	var obj = {};
	mMoreFilters.eachFilter = [];  // Reinitialize
	mMoreFilters.filtersAvailable = $('#m-moreFilters .item').length;
	mMoreFilters.filtersUsed = 0;  // Initialize

	for (var i = 1; i <= mMoreFilters.filtersAvailable; i++) {
		obj.target = '#m-moreFilters #filter' + i;
		obj.sql = {
			subName: 'filter' + i
		};

		if ( $(obj.target + ' .field').val() !== 'N/A' ) {
			mMoreFilters.eachFilter.push( get(obj) );
			mMoreFilters.filtersUsed += 1;
		}
	}


	return true;


	function get(obj) {
		var target = obj.target;
		var selectsArray = [];

		obj.idMain = $(target + ' .field option:selected').val();
		obj.operator = $(target + ' .operator').val();

		obj.paramsVal = [];
		obj.paramsText = [];
		selectsArray = $(target + " .fieldExpand").find("select");
		$.each(selectsArray, function( index, value ) {
			var selectClass = $(value).attr("class");
			var val = $(target + " .fieldExpand ." + selectClass + " option:selected").val();
			var text = $(target + " .fieldExpand ." + selectClass + " option:selected").text();
			obj.paramsVal.push(val);
			obj.paramsText.push(text);
		});

		obj = $.extend(true, {}, obj, getDefinitions(obj.idMain, obj.paramsVal, obj.paramsText));

		return obj;
	}

};




//================================================================
//===  chart.js  ==============================================
//==========================================================
//# sourceMappingURL=main.js.map