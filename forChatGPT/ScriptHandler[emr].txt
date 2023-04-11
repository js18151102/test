﻿﻿/*
 * 2012/09/11  kidd  新增給藥簽章測試用模式
 */
var Handler = {
	// ※※※ 其他動態事件驅動 ※※※
	otherEventHandle : function() {
		/*
		 * 一般處理常式
		 */

		// 更改標題
		js.CheckBoxUtility.changeTitleByName('rowCheckBox[]', '取消選取', '選取')
		js.CheckBoxUtility.changeTitleByName('controlCheckBox', '取消選取全部',
				'選取全部');

		$('input[name="doCheck"]').val('全部選取');
		$('input[name="doCheck"]').attr('title', '選取全部紀錄');

		// 加入資料列警示樣式
		// js.Handler.setWarningRow();

		/*
		 * 進行事件驅動的連接
		 */

		// 加入Control CheckBox的事件
		$('input[name="controlCheckBox"]').click(
				function() {
					js.CheckBoxUtility.checkAllByName(this, 'rowCheckBox[]');
					js.CheckBoxUtility.changeTitle(this, '取消選取全部', '選取全部');
					js.CheckBoxUtility.changeTitleByName('rowCheckBox[]',
							'取消選取', '選取');

					// 取得選取button
					var checkButton;
					checkButton = $('input[name="doCheck"]').eq(0);
					// alert();
					if ($(checkButton).val() == '全部選取') {
						$(checkButton).val('取消全選');
						$(checkButton).attr('title', '取消選取全部紀錄');
					} else {
						$(checkButton).val('全部選取');
						$(checkButton).attr('title', '選取全部紀錄');
					}
				});

		/*
		 * //檢查CheckBox的狀態 var loginType;
		 * loginType=$('input[name="controlType"]').val(); if
		 * (loginType=='staff'){ // }
		 */

		// 加入CheckBox的事件
		$('input[name="rowCheckBox[]"]').click(
				function() {
					js.CheckBoxUtility.uncheckByName('controlCheckBox');
					js.CheckBoxUtility.changeTitle(this, '取消選取', '選取');
					js.CheckBoxUtility.changeTitleByName('controlCheckBox',
							'取消選取全部', '選取全部');
				});

		// 加入表格列滑鼠移動事件 //.not('table.queryResultTable tr.head')
		$('table.queryResultTable tr[id^=seq_]').hover(function() {
			$(this).addClass('rowHover');
		}, function() {
			$(this).removeClass('rowHover');
		});

		// 加入檢視事件
		$('img[name="rowView"]').click(function() {

			// 取得資料
				var key;
				var emrType;
				var templateId;
				var templateVersion;
				
				key = $(this).parent('td').parent('tr').attr('id').replace(
						'seq_', '');

				emrType = $(this).parent('td').parent('tr').attr('emrType').replace('', '');
				templateId = $(this).parent('td').parent('tr').attr('TEMPLATE_ID').replace('', '');
				
				templateVersion = $(this).parent('td').parent('tr').attr('TEMPLATE_VERSION').replace('', '');
				// $.post('action.jsa','downloadKey='+'A.pdf'+'&actionCode=doDownloadPDF',resultHandler);

				// window.open('findPDF?dateseq=' + key + '&type=html',
				// '_blank');

				//window.open('objectviewer.htm?dateseq=' + key + '&type=html',
				//		'view_report', 'resizable=yes','toolbar=no');// ,'toolbar=no'
				if (templateId == "" || templateVersion == "")
				{
					window.open('objectviewer.htm?dateseq=' + key + '&type=html',
						'view_report', 'resizable=yes','toolbar=no');// ,'toolbar=no'
				}
				else 
				{
					//alert("keeeey1111 = " + key + " emr_Type = "+emrType);
					window.open('http://192.168.3.37:8180/Emr/Viewer/HTML/' + key +'/'+ emrType,
							'view_report', 'resizable=yes,toolbar=no,scrollbars=yes');// ,'toolbar=no'
					
				}
				// window.open('object.jsa?actionCode=beforeCreate' ,
				// '_blank','toolbar=no');
			});

		// 加入檢視XML事件
		$('img[name="rowViewXML"]').click(function() {

			// 取得資料
				var key;
				var emrType;
				key = $(this).parent('td').parent('tr').attr('id').replace(
						'seq_', '');

				// $.post('action.jsa','downloadKey='+'A.pdf'+'&actionCode=doDownloadPDF',resultHandler);

				window.open('findPDF?dateseq=' + key + '&type=xml', '_blank',
						'toolbar=no');

			});

		// 加入列印事件
		$('img[name="rowPrint"]').click(function() {

			// 取得資料
				var key;
				var emrType;
				var templateId;
				var templateVersion;
				key = $(this).parent('td').parent('tr').attr('id').replace(
						'seq_', '');
				emrType = $(this).parent('td').parent('tr').attr('emrType').replace('', '');
				templateId = $(this).parent('td').parent('tr').attr('TEMPLATE_ID').replace('', '');
				
				templateVersion = $(this).parent('td').parent('tr').attr('TEMPLATE_VERSION').replace('', '');
				// $.post('action.jsa','downloadKey='+'A.pdf'+'&actionCode=doDownloadPDF',resultHandler);

				//window.open('findPDF?dateseq=' + key + '&type=pdf', '_blank');
				if (templateId == "" || templateVersion == "")
				{
					window.open('findPDF?dateseq=' + key + '&type=pdf', '_blank');
				}
				else 
				{
					//alert("keeeey22222 = " + key + " emr_Type = "+emrType);
					window.open('http://192.168.3.37:8180/Emr/Viewer/PDF/' + key +'/'+ emrType,
							'view_report', 'resizable=yes','toolbar=no');// ,'toolbar=no'
				}
				// window.open('objectviewer.jsa?dateseq=' + key + '&type=pdf',
				// '_blank');
				//alert("key="+key);
				$.post('UpdateChtProt','emr_seq='+key+'&flag=N');//送資料到UpdateChtProt更新
				//alert("update end");

				/*$.ajax({
			        type: "GET",
			        url: "/UpdateChtProt?emr_seq="+key,
			        success: function(){
			            alert("Update successful");
			        },
			        error: function (){
			        	alert(key);
			            alert("sorry Update failed");
			        }
			    });*/

			});

		// 加入LABPHOTO連結
		$('img[name="rowViewPhoto"]')
				.click(function() {
					// 取得資料
						var key;
						key = $(this).parent('td').parent('tr').attr('id')
								.replace('seq_', '');

						window
								.open('photoviewer.htm?seq=' + key, '_blank',
										'width=1200,height=900,resizable=yes,scrollbars=yes,toolbar=no');

					});

		// 加入申請事件
		$('img[name="rowLock"]')
				.click(function() {
					// 取得資料
						var key;
						key = $(this).parent('td').parent('tr').attr('id')
								.replace('seq_', '');

						var alt;
						alt = $(this).attr('alt');

						if (alt == '申請查看') {
							var dialog;
							dialog = confirm('您沒有權限查看此管制病歷' + '，是否要填寫申請表單以開放查看此病患之病歷？');
							if (dialog) {
								window
										.open(
												'query.jsa?actionCode=beforeCctrlApply&seq=' + key,
												'_blank',
												'height=600,width=600,toolbar=no');
							}
						} else {
							window
									.open(
											'query.jsa?actionCode=beforeCctrlApply&seq=' + key,
											'_blank',
											'height=600,width=600,toolbar=no');
						}

					});

		// 加入分頁查詢按鈕的事件
		$('span[name="doAjaxPageQuery"]').click(function() {
			// alert(22);
				var pageNumber;
				pageNumber = $(this).attr('id').replace('pageNumber_', '');

				if (pageNumber) {
					// 設定分頁
					$('input[name="pageNumber"]').val(pageNumber);

					// 查詢
					js.Handler.ajaxPageQuery();
				}
			});
	},

	// ※※※ 一般事件驅動 ※※※
	readyEventHandle : function() {
		// alert($('applet#hcacs').size());

		// 檢查登入型態
		var check;
		// 20120911給藥簽章測試用開關
		var changeToId;
		var isTest;
		check = js.Handler.checkControlType();
		if (!check) {
			return;
		}

		// 檢查Applet
		// var check;
		check = js.Handler.checkApplet();

		// 檢查Cookies
		js.Handler.checkCookies();

		// if (!check){return;}

		// 初始化StatusBox
		js.StatusBox.initialize();

		// 初始化InputBox
		js.InputBox.initialize();
		js.InputBox.maxLength = 6;
		js.InputBox.isPassword = true;

		/*
		 * 進行事件驅動的連接
		 */

		$(window)
				.scroll(function() {
					// 取得捲軸位置
						var scrollTop;

						if (typeof (window.pageYOffset) == 'number') {
							// Netscape
							scrollTop = window.pageYOffset;
							// scrX = window.pageXOffset;
						} else if (document.body
								&& (document.body.scrollLeft || document.body.scrollTop)) {
							// DOM
							scrollTop = document.body.scrollTop;
							// scrX = document.body.scrollLeft;
						} else if (document.documentElement
								&& (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
							// IE6
							scrollTop = document.documentElement.scrollTop;
							// scrX = document.documentElement.scrollLeft;
						}
						// window.defaultStatus= scrollTop;

						// 設定位置
						if (scrollTop) {
							// $('div#inputBox_overlayLayer').css('height',(scrollTop+1000));
							$('div#inputBox_overlayLayer').css('top',
									(scrollTop));
							$('div#inputBox_containLayer').css('top',
									(120 + scrollTop));

							$('div#statusBox_overlayLayer').css('top',
									(scrollTop));
							$('div#statusBox_containLayer').css('top',
									(120 + scrollTop));
						} else {
							$('div#statusBox_overlayLayer').css('top', (0));
							$('div#statusBox_containLayer').css('top', (120));
						}
					});

		// 加入清除查詢按鈕的事件
		$('input[name="clearQuery"]').click(function() {
			document.forms['queryForm'].reset();

			// 清除欄位
				$('input[name="identificationID"]').val('');
				$('input[name="pinCode"]').val('');
				$('input[name="staffIdentificationID"]').val('');

				// 清除日期
				var now = new Date();
				var year = now.getFullYear().toString();
				for ( var i = 0; i < 4 - year.length; i++) {
					year = '0' + year;
				}
				var month = (now.getMonth() + 1).toString();
				var date = now.getDate().toString();
				var value = year + '/'
						+ (month.length == 2 ? month : '0' + month) + '/'
						+ (date.length == 2 ? date : '0' + date);
				// alert(month.length);
				// 2012/08/08 清除後日期不給預設值
				// $('input[name="medicalRecordDateStart"]').val(value);
				// $('input[name="medicalRecordDateEnd"]').val(value);
				// $('input[name="medicalRecordDateStart"]').val('');
				// $('input[name="medicalRecordDateEnd"]').val('');

				// 清除下拉選單的值(選到空白)
				// 2012/08/08 改為多選以為下拉選單
				// $('select[name="emrCategory"]').val(' ');
				$("input[name='emrType[]']").each(function() {
					$(this).attr("checked", false);
				});
				// $('input[name="emrCategoryList"]').val('');

				// 清除選項按鈕的值
				// 檢查登入型態
				var controlType;
				controlType = $('input[name="controlType"]').val();
				// alert(controlType);
				if (controlType == 'staff' || controlType == 'medica') {
					$('input[name="signState"][value="Yet"]').attr('checked',
							'checked');
				} else {
					$('input[name="signState"][value="All"]').attr('checked',
							'checked');
				}
				$('input[name="overdueState"][value="All"]').attr('checked',
						'checked');
			});
		// 2012/08/08 kidd add start
		// 加入emr_type的選擇區塊
		$('input[name="openEmrType"]').click(function() {
			// 開啟區塊
				if (emrType.style.display == 'none')
					emrType.style.display = ''; // 顯示
				else
					// 不顯示
					emrType.style.display = 'none';
			});
		// 關閉按鈕事件
		$('input[name="close"]').click(function() {
			// 開啟區塊
				if (emrType.style.display == 'none')
					emrType.style.display = ''; // 顯示
				else
					// 不顯示
					emrType.style.display = 'none';
			});

		// 全選
		$('input[id="checkBox_All"]').click(function() {
			if ($('input[name="check_status"]').val() == '0') {
				$("input[name='emrType[]']").each(function() {
					$(this).attr("checked", true);
				});
				$('input[name="check_status"]').val('1')
			} else {
				$("input[name='emrType[]']").each(function() {
					$(this).attr("checked", false);
				});
				$('input[name="check_status"]').val('0');
			}
		});
		// end
		// 加入查詢Old給藥待簽
		$('input[name="doOldMedicaQuery"]').click(function() {
			// 檢查登入型態
				js.Handler.checkControlType();
				js.Handler.medicaQuery();
			});
		// 加入簽章按鈕的事件
		$('input[name="doAjaxSignUp"]').click(function() {
					var check;
					check = js.Handler.checkCardInfo();
					if (!check) {
						return;
					}

					// 取得參數
						var cardNo;
						var mchType;
						var signModule;
						var signSession;
						var idno;

						cardNo = $('input[name="cardNo"]').val();
						mchType = $('input[type="hidden"][name="mchType"]')
								.val();

						idno = $('input[name="userIdNo"]').val();

						// 定義接收到回應後的資料處理函式
						var resultHandler;
						resultHandler = function(result) {
							if (result == null || result == '') {
								alert('發生錯誤，伺服器的處理程序被終止！');
								return;
							}

							// alert(result);
							// return;

							// 檢查是否有取得原文
							var jsonResult;
							jsonResult = $.parseJSON(result);

							var row;
							row = $('tr[id="seq_' + jsonResult.rowData + '"]');

							var column;
							column = $(row).children('td[name="SIGN_STATE"]');

							// var agents_name;
							// agents_name=$(row).children('td[name="AGENT_NAME"]').html();

							if (jsonResult.state) {
								// 取得成功

								// 開始簽章
								var signResult;

								// 設定訊息
								js.StatusBox.setNotify('處理資料' + jsonResult.rowData + '...','開始簽章...');
								$(column).html('開始簽章...');

								// 執行佇列函式
								// js.Handler.traceDequeue(js.Handler.dequeueCount);

								// 簽章
								// alert(jsonResult.plain);
								// signResult=js.CardReader.HCACS.csSignData(jsonResult.plain);
								if (js.CardReader.cardMachineType == 'HCACS') {
									// alert(jsonResult.plain);
									try {
										signResult = js.CardReader.HCACS.csSignData(jsonResult.plain);
									} catch (e) {
										$(column).html('HCACS簽章錯誤' + e.message);
									}
								} else {
									try {
										signResult = js.CardReader.HCA.signData(jsonResult.plain);
									} catch (e) {
										$(column).html('HCA簽章錯誤' + e.message);
									}
								}

								// 追蹤簽章時間
								js.Handler.trace(signResult.timeSpan);
								// alert();

								// 執行佇列函式
								js.Handler.dequeue(js.Handler.dequeueCount);

								// 取得該元素的偏移量
								/*
								 * var position = $(row).position();
								 * //$(row).scrollTop(position.top ); if
								 * (position){ window.scrollTo(0,position.top); }
								 */

								$(column).html('準備更新伺服器資料...');

								// 設定訊息
								js.StatusBox.setNotify('處理資料' + jsonResult.rowData + '...','簽章完成(耗時' + signResult.timeSpan + '秒)<br/>更新伺服器資料...');

								// 定義接收處理函式
								var resultHandler2 = function(result) {
									// alert(result);

									if (result == null || result == '') {
										alert('發生錯誤，伺服器的處理程序被終止！');
										return;
									}

									$(column).html('取得狀態...');
									jsonResult = $.parseJSON(result);

									if (jsonResult.accept) {
										// 簽章成功
										var row;
										row = $('tr[id="seq_' + jsonResult.rowData + '"]');

										// 取消核取
										var checkBox;
										checkBox = $(row).children('td').children('input[type="checkbox"][name="rowCheckBox[]"]');

										$(checkBox).removeAttr("checked");
										js.CheckBoxUtility.changeTitle(checkBox, '取消選取', '選取');

										// 刪除checkBox
										$(checkBox).remove();

										// 刪除狀態
										$(row).removeAttr('state');

										if (jsonResult.state) {

											// 表示狀態正常
											$(column).html('簽章完成！')

											// 設定標題與訊息
											js.StatusBox.setNotify('處理資料' + jsonResult.rowData + '...','簽章完成！');

											// 填入回應資料											
											$(row).children('td[name="SIGN_STATE"]').html(jsonResult.signState);
											$(row).children('td[name="SIGN_STATE"]').attr('id',jsonResult.signState);
											$(row).children('td[name="SIGN_DATE"]')	.html(jsonResult.signDate);
											//2014/06/05 tailh 簽章完成時增加抓取簽章人的資料
											$(row).children('td[name="SIGN_NAME"]')	.html(jsonResult.signName);


										} else {
											var message;
											message = js.Handler.getErrorMessage('錯誤！',jsonResult.errorType,jsonResult.errorCode);

											$(column).html('簽章完成！但無法取得資訊');

											// 設定標題與訊息
											js.StatusBox.setNotify('處理資料' + jsonResult.rowData + '...','簽章完成！但無法取得資訊' + '<br/>' + message);

										}
										// 修改counter
										js.Handler.alterCounter(row);

										// 顯示資訊
										// js.Handler.showStatus();

										// 設定進度
										js.StatusBox.step(true);
									} else {
										var message;
										// message='錯誤！'+jsonResult.message+jsonResult.errorCode;
										message = js.Handler.getErrorMessage('錯誤！', jsonResult.errorType,	jsonResult.errorCode);
										$(column).html(message);

										// 設定標題與訊息
										js.StatusBox.setNotify('處理資料' + signResult.rowData + '...',message);

										// 設定進度
										js.StatusBox.step(false);
									}

									// 執行佇列函式
									// js.Handler.dequeue(js.Handler.dequeueCount);
								};

								if (signResult.state) {
									$(column).html('提交伺服器資料...');
									$('input[name="text"]').val(
											signResult.signedData);

									// 送交伺服器
									/*
									 * $.post('signature.jsa',
									 * 'actionCode=doSignAfter'+
									 * '&rowData='+jsonResult.rowData+
									 * '&signedPlain='+encodeURIComponent(signResult.signedData)+
									 * '&cardNo='+cardNo,resultHandler2 );
									 */

									// 提交
									$
											.ajax( {
												success : resultHandler2,
												error : function(response) {
													/*
													 * alert(response.responseText);
													 * alert(response.responseXML);
													 * alert(response.status);
													 * alert(response.statusText);
													 */

													// 取消核取
													var checkBox;
													checkBox = $(row).children('td').children('input[type="checkbox"][name="rowCheckBox[]"]');

													// 設定進度
													js.StatusBox.step(false);

													$(checkBox).removeAttr("checked");
													js.CheckBoxUtility.changeTitle(checkBox,'取消選取','選取');
													$(column).html('請求簽章完成逾時');
													$(document).dequeue();
												},
												async : true,
												data : 'actionCode=doSignAfter'
														+ '&rowData='
														+ jsonResult.rowData
														+ '&signedPlain='
														+ encodeURIComponent(signResult.signedData)
														+ '&cardNo=' + cardNo
														+ '&idno=' + idno,
												dataType : 'text',
												timeout : 30000,
												type : 'post',
												url : 'signature.jsa'
											});

								} else {
									var message = js.Handler.getErrorMessage('簽章失敗', result.errorType,result.errorCode);

									$(column).html(message);

									// 設定標題與訊息
									js.StatusBox.setNotify('處理資料' + jsonResult.rowData + '...',message);

									// 設定進度
									js.StatusBox.step(false);
								}
							} else {
								var message = js.Handler.getErrorMessage('取得待簽檔案失敗', jsonResult.errorType,jsonResult.errorCode);

								$(column).html(message);

								// 設定標題與訊息
								js.StatusBox.setNotify('處理資料' + jsonResult.rowData + '...',message);

								// 設定進度
								js.StatusBox.step(false);

								// 執行佇列函式
								js.Handler.traceDequeue(js.Handler.dequeueCount);
							}
						};

						// 定義循覽物件的處理函式
						var eachHandler;
						eachHandler = function(index, item) {
							$(document).queue(function() {
												if ($(item).attr('checked')) {
													var row;
													row = $(item).parent('td').parent('tr');
													if ($(row).attr('state') == 'onSignUp') {// 正在簽章，不做處理
														return;
													}

													// 增加狀態
													$(row).attr('state',
															'onSignUp');
													var column;
													column = $(row).children('td[name="SIGN_STATE"]');
													$(column).html('取得簽章資料...');

													var rowData;
													rowData = $(row).attr('id').replace("seq_", "");

													// 設定標題與訊息
													js.StatusBox.setNotify('處理資料' + rowData + '...',	'取得簽章資料...');

													// 提交
													/*
													 * $.post('signature.jsa',
													 * 'rowData=' +rowData
													 * +'&actionCode=doGetPlain',
													 * resultHandler);
													 */

													// 提交
													$
															.ajax( {
																success : resultHandler,
																error : function(response){
																	// 取消核取
																	var checkBox;
																	checkBox = $(row).children('td').children('input[type="checkbox"][name="rowCheckBox[]"]');

																	// 設定進度
																	js.StatusBox.step(false);

																	$(checkBox).removeAttr("checked");
																	js.CheckBoxUtility.changeTitle(	checkBox,'取消選取',	'選取');
																	$(column).html('請求待簽檔案逾時');
																	$(document).dequeue();
																},
																async : true,
																data : 'rowData=' + rowData + '&actionCode=doGetPlain',
																dataType : 'text',
																timeout : 30000,
																type : 'post',
																url : 'signature.jsa'
															});
												}
											});
						}

						/* ※※※簽章程式開始執行處※※※ */

						// 檢查Applet
						var check;
						check = js.Handler.checkApplet();
						if (!check) {
							return;
						}

						// 設定動作代碼
						$(
								'form[name="resultForm"] input[type="hidden"][name="actionCode"]')
								.val('doSignUp');

						// 取得勾選的資料
						var checkedList;
						checkedList = $('input[type="checkbox"][name="rowCheckBox[]"]:checked');

						// 提交簽章資料
						if (checkedList.length != 0) {
							// 檢查是否有卡片資料
							var cardNo;
							cardNo = $('input[name="cardNo"]').val();
							// alert(cardNo);

							// 取得PIN碼
							var pinCode;
							pinCode = $('input[name="pinCode"]').val();

							// 檢查是否有卡片資料
							if (!cardNo) {
								// 讀卡
								var jsonObject;
								// alert(1);
								jsonObject = js.CardReader.getCardInfo(document
										.getElementById('cardReaderMessage'));

								if (jsonObject.state) {
									// 嘗試新增卡片資料
									js.Handler.addCardInfo(jsonObject.cardNo,
											jsonObject.chineseName,
											jsonObject.staffIdentificationID,
											jsonObject.sex,
											jsonObject.birthDate,
											jsonObject.signCert,
											jsonObject.startDate,
											jsonObject.endDate);

									// 設定控制型態
									$('input[name="controlType"]').val('staff');
									$(this).trigger('click');
								} else {
									var message = js.Handler.getErrorMessage(
											result.message, result.errorType,
											result.errorCode);
									alert(message);
									return;
								}

							} else {
								// 檢查ID是否相同
								var idNo;
								idNo = $('input[name="staffIdentificationID"]')
										.val();

								var jsonObject;

								// 如果是一般卡機，先重新初始化
								if (js.CardReader.cardMachineType == 'HCA') {
									var initResult;
									initResult = js.CardReader.HCA
											.initSession(pinCode);
									if (!initResult.state) {
										var message = js.Handler
												.getErrorMessage(
														initResult.message,
														initResult.errorType,
														initResult.errorCode);
										alert(message);
										return;
									}
								}

								// 取得基本資料
								jsonObject = js.CardReader.getBaseData();
								if (jsonObject.state) {
									if (idNo != jsonObject.staffIdentificationID) {
										alert('檢查到現在插的卡片與先前的資料不相同\n' + '如您剛剛換過卡片請重新讀卡！');
										return;
									}
								} else {
									var message = js.Handler.getErrorMessage(
											jsonObject.message,
											jsonObject.errorType,
											jsonObject.errorCode);
									alert(message);
									return;
								}

							}

							// 檢查PIN碼
							// alert(pinCode);
							//alert("@@@1");
							if (!pinCode) {
								js.InputBox.acceptTrigger = $(this);
								js.InputBox.setNotify('輸入PIN碼', '請輸入PIN碼用以驗證',
										'');
								js.InputBox.show();
								js.InputBox.focus();
								return;
							}

							var dialog;
							dialog = confirm('共選擇了' + checkedList.length + '筆資料，是否確定開始簽章？\n' + '開始簽章後，請耐心等待所有資料簽章完成！');
							if (dialog) {

								// 重設StatusBox
								js.StatusBox.reset();

								// 顯示StatusBox
								js.StatusBox.show();

								// 設定標題與訊息
								js.StatusBox.setNotify('檢查卡機狀態', '驗證PIN碼...');

								// 驗pin碼
								var result;
								if (js.CardReader.cardMachineType == 'HCACS') {
									result = js.CardReader.HCACS
											.hcaVerifyPIN(pinCode);
								} else {
									result = js.CardReader.HCA
											.initSession(pinCode);
								}

								// 驗pin碼是否通過
								if (result.state) {

									// 設定訊息
									js.StatusBox.setMessage(result.message);
									// 設定最大值
									js.StatusBox.maximumValue = checkedList.length;

									// 設定總筆數
									js.StatusBox
											.setAllCount(checkedList.length);

									// 設定選項
									js.StatusBox.setCloseOption(false);
									js.StatusBox.setCancelOption(true);

									// 設定狀態寬度
									$('table.resultTable td.SIGN_STATE').eq(0)
											.css('width', '100px');

									// 逐一送出
									$.each(checkedList, eachHandler);

									// 執行佇列函式
									js.Handler
											.traceDequeue(js.Handler.dequeueCount - 1);
									// js.Handler.dequeue(js.Handler.dequeueCount-1);

									// 隱藏StatusBox
									// js.StatusBox.hide();
								} else {
									js.StatusBox.setCloseOption(true);
									js.StatusBox.setCancelOption(false);

									var message = js.Handler.getErrorMessage(
											result.message, result.errorType,
											result.errorCode);
									// 設定訊息
									js.StatusBox.setNotify('發生錯誤', message);
								}
							} else {
								return;
							}
						} else {
							alert('沒有勾選任何簽章資料！');
							return;
						}
					});
		// 開啟設定代理人畫面
		$('input[id="setAgents"]').click(
				function() {

					window.open("./agentsSet.jsp?id="
							+ $('input[name="userAccount"]').val() + '&type='
							+ $('input[name="controlType"]').val(), "",
							"fullscreen=yes,status=yes");

				});


		// 加入給藥簽章按鈕的事件
		$('input[name="doAjaxMedicaSignUp"]').click(function() {
					var check;
					check = js.Handler.checkCardInfo();
					if (!check) {
						return;
					}

					// 取得參數
						var cardNo;
						var mchType;
						var signModule;
						var signSession;
						var idno;

						cardNo = $('input[name="cardNo"]').val();
						mchType = $('input[type="hidden"][name="mchType"]').val();

						idno = $('input[name="userIdNo"]').val();

						// 定義接收到回應後的資料處理函式
						var resultHandler;
						resultHandler = function(result) {
							if (result == null || result == '') {
								alert('發生錯誤，伺服器的處理程序被終止！');
								return;
							}

							// alert(result);
							// return;

							// 檢查是否有取得原文
							var jsonResult;
							jsonResult = $.parseJSON(result);

							var row;
							row = $('tr[id="seq_' + jsonResult.rowData + '"]');

							var column;
							column = $(row).children('td[name="SIGN_STATE"]');

							// var agents_name;
							// agents_name=$(row).children('td[name="AGENT_NAME"]').html();

							if (jsonResult.state) {
								// 取得成功

								// 開始簽章
								var signResult;

								// 設定訊息
								js.StatusBox.setNotify('處理資料' + jsonResult.rowData + '...','開始簽章...');
								$(column).html('開始簽章...');

								// 執行佇列函式 Mark by changfy 20110707 for 2048
								// 改為簽章後再送
								// js.Handler.traceDequeue(js.Handler.dequeueCount);

								// 簽章
								// alert(jsonResult.plain);
								// signResult=js.CardReader.HCACS.csSignData(jsonResult.plain);
								if (js.CardReader.cardMachineType == 'HCACS') {
									// alert(jsonResult.plain);
									try {
										signResult = js.CardReader.HCACS.csSignData(jsonResult.plain);
									} catch (e) {
										$(column).html('HCACS簽章錯誤' + e.message);
									}
								} else {
									try {
										signResult = js.CardReader.HCA.signData(jsonResult.plain);
									} catch (e) {
										$(column).html('HCA簽章錯誤' + e.message);
									}
								}

								// 追蹤簽章時間
								js.Handler.trace(signResult.timeSpan);
								// alert();

								// 執行佇列函式 ADD BY CHANGFY 20110707 FOR
								js.Handler.dequeue(js.Handler.dequeueCount);

								// 取得該元素的偏移量
								/*
								 * var position = $(row).position();
								 * //$(row).scrollTop(position.top ); if
								 * (position){ window.scrollTo(0,position.top); }
								 */

								$(column).html('準備更新伺服器資料...');

								// 設定訊息
								js.StatusBox.setNotify('處理資料' + jsonResult.rowData + '...','簽章完成(耗時' + signResult.timeSpan + '秒)<br/>更新伺服器資料...');

								// 定義接收處理函式
								var resultHandler2 = function(result) {
									// alert(result);

									if (result == null || result == '') {
										alert('發生錯誤，伺服器的處理程序被終止！');
										return;
									}

									$(column).html('取得狀態...');
									jsonResult = $.parseJSON(result);

									if (jsonResult.accept) {
										// 簽章成功
										var row;
										row = $('tr[id="seq_' + jsonResult.rowData + '"]');

										// 取消核取
										var checkBox;
										checkBox = $(row).children('td').children('input[type="checkbox"][name="rowCheckBox[]"]');

										$(checkBox).removeAttr("checked");
										js.CheckBoxUtility.changeTitle(checkBox, '取消選取', '選取');

										// 刪除checkBox
										$(checkBox).remove();

										// 刪除狀態
										$(row).removeAttr('state');

										if (jsonResult.state) {

											// 表示狀態正常
											$(column).html('簽章完成！')

											// 設定標題與訊息
											js.StatusBox.setNotify('處理資料' + jsonResult.rowData + '...','簽章完成！');

											// 填入回應資料
											$(row).children('td[name="SIGN_STATE"]').html(jsonResult.signState);
											$(row).children('td[name="SIGN_STATE"]').attr('id',jsonResult.signState);											
											$(row).children('td[name="SIGN_DATE"]').html(jsonResult.signDate);
											//2014/06/05 tailh 簽章完成時增加抓取簽章人的資料
											$(row).children('td[name="SIGN_NAME"]')	.html(jsonResult.signName);

										} else {
											var message;
											message = js.Handler.getErrorMessage('錯誤！',jsonResult.errorType,jsonResult.errorCode);

											$(column).html('簽章完成！但無法取得資訊');

											// 設定標題與訊息
											js.StatusBox.setNotify('簽章完成！但無法取得資訊' + '<br/>' + message);

										}
										// 修改counter
										js.Handler.alterCounter(row);

										// 顯示資訊
										// js.Handler.showStatus();

										// 設定進度
										js.StatusBox.step(true);
									} else {
										var message;
										// message='錯誤！'+jsonResult.message+jsonResult.errorCode;
										message = js.Handler.getErrorMessage('錯誤！', jsonResult.errorType,	jsonResult.errorCode);
										$(column).html(message);

										// 設定標題與訊息
										js.StatusBox.setNotify('處理資料' + signResult.rowData + '...',message);

										// 設定進度
										js.StatusBox.step(false);
									}

									// 執行佇列函式
									// js.Handler.dequeue(js.Handler.dequeueCount);
								};

								if (signResult.state) {
									$(column).html('提交伺服器資料...');
									$('input[name="text"]').val(signResult.signedData);

									// 送交伺服器
									/*
									 * $.post('signature.jsa',
									 * 'actionCode=doSignAfter'+
									 * '&rowData='+jsonResult.rowData+
									 * '&signedPlain='+encodeURIComponent(signResult.signedData)+
									 * '&cardNo='+cardNo,resultHandler2 );
									 */

									// 提交
									$.ajax( {
												success : resultHandler2,
												error : function(response) {
													// 取消核取
													var checkBox;
													checkBox = $(row).children('td').children('input[type="checkbox"][name="rowCheckBox[]"]');

													// 設定進度
													js.StatusBox.step(false);

													$(checkBox).removeAttr("checked");
													js.CheckBoxUtility.changeTitle(checkBox,'取消選取','選取');
													$(column).html('請求簽章完成逾時');
													$(document).dequeue();
												},
												async : true,
												data : 'actionCode=doSignAfter'
														+ '&rowData='
														+ jsonResult.rowData
														+ '&signedPlain='
														+ encodeURIComponent(signResult.signedData)
														+ '&cardNo=' + cardNo
														+ '&idno=' + idno,
												dataType : 'text',
												timeout : 30000,
												type : 'post',
												url : 'signature.jsa'
											});

								} else {
									var message = js.Handler.getErrorMessage('簽章失敗', result.errorType,result.errorCode);

									$(column).html(message);

									// 設定標題與訊息
									js.StatusBox.setNotify('處理資料' + jsonResult.rowData + '...',message);

									// 設定進度
									js.StatusBox.step(false);
								}
							} else {
								var message = js.Handler.getErrorMessage('取得待簽檔案失敗', jsonResult.errorType,jsonResult.errorCode);

								$(column).html(message);

								// 設定標題與訊息
								js.StatusBox.setNotify('處理資料' + jsonResult.rowData + '...',message);
								// 設定進度
								js.StatusBox.step(false);

								// 執行佇列函式
								js.Handler.traceDequeue(js.Handler.dequeueCount);
							}
						};

						// 定義循覽物件的處理函式
						var eachHandler;
						eachHandler = function(index, item) {
							$(document)
									.queue(
											function() {
												if ($(item).attr('checked')) {
													var row;
													row = $(item).parent('td')
															.parent('tr');
													if ($(row).attr('state') == 'onSignUp') {
														// 正在簽章，不做處理
														return;
													}

													// 增加狀態
													$(row).attr('state',
															'onSignUp');
													var column;
													column = $(row)
															.children(
																	'td[name="SIGN_STATE"]');
													$(column).html('取得簽章資料...');

													var rowData;
													rowData = $(row)
															.attr('id')
															.replace("seq_", "");

													// 設定標題與訊息
													js.StatusBox
															.setNotify(
																	'處理資料' + rowData + '...',
																	'取得簽章資料...');

													// 提交
													/*
													 * $.post('signature.jsa',
													 * 'rowData=' +rowData
													 * +'&actionCode=doGetPlain',
													 * resultHandler);
													 */

													// 提交
													$
															.ajax( {
																success : resultHandler,
																error : function(
																		response) {
																	// 取消核取
																	var checkBox;
																	checkBox = $(
																			row)
																			.children(
																					'td')
																			.children(
																					'input[type="checkbox"][name="rowCheckBox[]"]');

																	// 設定進度
																	js.StatusBox
																			.step(false);

																	$(checkBox)
																			.removeAttr(
																					"checked");
																	js.CheckBoxUtility
																			.changeTitle(
																					checkBox,
																					'取消選取',
																					'選取');
																	$(column)
																			.html(
																					'請求待簽檔案逾時');
																	$(document)
																			.dequeue();
																},
																async : true,
																data : 'rowData=' + rowData + '&actionCode=doGetPlain',
																dataType : 'text',
																timeout : 30000,
																type : 'post',
																url : 'signature.jsa'
															});
												}
											});
						}

						/* ※※※簽章程式開始執行處※※※ */

						// 檢查Applet
						var check;
						check = js.Handler.checkApplet();
						if (!check) {
							return;
						}

						// 設定動作代碼
						$(
								'form[name="resultForm"] input[type="hidden"][name="actionCode"]')
								.val('doSignUp');

						// 檢查是否有卡片資料
						var cardNo;
						cardNo = $('input[name="cardNo"]').val();
						// alert(cardNo);

						// 取得PIN碼
						var pinCode;
						pinCode = $('input[name="pinCode"]').val();

						// 檢查是否有卡片資料
						if (!cardNo) {
							// 讀卡
							var jsonObject;
							// alert(1);
							jsonObject = js.CardReader.getCardInfo(document
									.getElementById('cardReaderMessage'));

							if (jsonObject.state) {
								// 嘗試新增卡片資料
								js.Handler.addCardInfo(jsonObject.cardNo,
										jsonObject.chineseName,
										jsonObject.staffIdentificationID,
										jsonObject.sex, jsonObject.birthDate,
										jsonObject.signCert,
										jsonObject.startDate,
										jsonObject.endDate);

								// 設定控制型態
								$('input[name="controlType"]').val('medica');
								$(this).trigger('click');
							} else {
								var message = js.Handler.getErrorMessage(
										result.message, result.errorType,
										result.errorCode);
								alert(message);
								return;
							}

						} else {
							// 檢查ID是否相同
							var idNo;
							idNo = $('input[name="staffIdentificationID"]')
									.val();

							var jsonObject;

							// 如果是一般卡機，先重新初始化
							if (js.CardReader.cardMachineType == 'HCA') {
								var initResult;
								initResult = js.CardReader.HCA
										.initSession(pinCode);
								if (!initResult.state) {
									var message = js.Handler.getErrorMessage(
											initResult.message,
											initResult.errorType,
											initResult.errorCode);
									alert(message);
									return;
								}
							}

							// 取得基本資料
							jsonObject = js.CardReader.getBaseData();
							if (jsonObject.state) {
								if (idNo != jsonObject.staffIdentificationID) {
									alert('檢查到現在插的卡片與先前的資料不相同\n' + '如您剛剛換過卡片請重新讀卡！');
									return;
								}
							} else {
								var message = js.Handler.getErrorMessage(
										jsonObject.message,
										jsonObject.errorType,
										jsonObject.errorCode);
								alert(message);
								return;
							}

						}

						// 檢查PIN碼
						// alert(pinCode);
						//alert("@@@2");
						if (!pinCode) {
							js.InputBox.acceptTrigger = $(this);
							js.InputBox.setNotify('輸入PIN碼', '請輸入PIN碼用以驗證', '');
							js.InputBox.show();
							js.InputBox.focus();
							return;
						}

						// ※※※先產生給藥記錄※※※
						var idNo;
						idNo = $('input[name="staffIdentificationID"]').val();

						if (!idNo) {
							alert('發生錯誤，無法取得登入者的身分證字號！');
						}

						var dialog;
						dialog = confirm('此動作將會產生給藥簽章記錄，是否確定開始產生記錄？\n' + '開始產生後這個動作將會執行一段時間，\n' + '請耐心等待所有資料產生並簽章完成！');
						if (dialog) {
							// 設定標題與訊息
							js.StatusBox.setNotify('查詢待產生給藥簽章記錄',
									'正在產生記錄，請稍候...');
							// 定義接收到回應後的資料處理函式
							var createHandler;
							createHandler = function(result) {
								if (result == null || result == '') {
									alert('發生錯誤，伺服器的處理程序被終止！');
									return;
								}

								// 檢查是否呼叫成功
								var jsonResult;
								jsonResult = $.parseJSON(result);
								if (jsonResult.state) {

									// 設定標題與訊息
									js.StatusBox.setNotify('產生給藥簽章記錄', '產生完成');

									// 隱藏StatusBox
									js.StatusBox.hide();

									// 連鎖簽章
									// alert('連鎖簽章-start');
									// js.Handler.chainSign(pinCode,js.Handler.medicaQuery);
									// alert('連鎖簽章-end');

									// ※※※查詢未簽記錄※※※
									// js.Handler.medicaQuery();
									// alert(12312);

									// ※※※全選※※※
									// $('input[name="doCheck"]').trigger('click');

									// ※※※取得勾選的資料※※※
									var checkedList;
									checkedList = $('input[type="checkbox"][name="rowCheckBox[]"]:checked');

									// 提交簽章資料
									if (checkedList.length == 0) {
										alert('您沒有任何簽章資料！');
									} else {

										// 重設StatusBox
										js.StatusBox.reset();

										// 顯示StatusBox
										js.StatusBox.show();

										// 設定標題與訊息
										js.StatusBox.setNotify('檢查卡機狀態',
												'驗證PIN碼...');

										// 驗pin碼
										var result;
										if (js.CardReader.cardMachineType == 'HCACS') {
											result = js.CardReader.HCACS
													.hcaVerifyPIN(pinCode);

										} else {
											result = js.CardReader.HCA
													.initSession(pinCode);
										}

										// 驗pin碼是否通過
										if (result.state) {

											// 設定訊息
											js.StatusBox
													.setMessage(result.message);
											// 設定最大值
											js.StatusBox.maximumValue = checkedList.length;

											// 設定總筆數
											js.StatusBox
													.setAllCount(checkedList.length);

											// 設定選項
											js.StatusBox.setCloseOption(false);
											js.StatusBox.setCancelOption(true);

											// 設定狀態寬度
											$('table.resultTable td.SIGN_STATE')
													.eq(0)
													.css('width', '100px');

											// 逐一送出
											$.each(checkedList, eachHandler);

											// 執行佇列函式
											js.Handler
													.traceDequeue(js.Handler.dequeueCount - 1);
											// js.Handler.dequeue(js.Handler.dequeueCount-1);

											// 隱藏StatusBox
											// js.StatusBox.hide();
										} else {
											js.StatusBox.setCloseOption(true);
											js.StatusBox.setCancelOption(false);

											var message = js.Handler
													.getErrorMessage(
															result.message,
															result.errorType,
															result.errorCode);
											// 設定訊息
											js.StatusBox.setNotify('發生錯誤',
													message);
										}
									}
								} else {
									var message = js.Handler.getErrorMessage(
											jsonResult.message,
											jsonResult.errorType,
											jsonResult.errorCode);
									// 顯示訊息
									alert(message);
								}
							};

							// 重設StatusBox
							js.StatusBox.reset();

							// 設定標題與訊息
							js.StatusBox
									.setNotify('產生給藥簽章記錄',
											'<center><img alt="loading.." src="images/loading5.gif"></center>');

							// 顯示StatusBox
							js.StatusBox.show();

							// 設定選項
							js.StatusBox.setCloseOption(false);
							js.StatusBox.setCancelOption(false);

							// 提交
							$
									.ajax( {
										success : createHandler,
										error : function(response) {
											alert('產生給藥記錄逾時');
											js.StatusBox.setCloseOption(true);
											return;
										},
										async : true,
										data : 'actionCode=doCreateMedica&staffIdNo=' + idNo,
										dataType : 'text',
										timeout : 600000,
										type : 'post',
										url : 'signature.jsa'
									});
						} else {
							// 隱藏StatusBox
							js.StatusBox.hide();
							return;
						}

					});

		// 加入給連鎖簽章按鈕的事件
		$('input[name="doAjaxChainSignUp"]')
				.click(function() {
					var check;
					check = js.Handler.checkCardInfo();
					if (!check) {
						return;
					}

					// 取得參數
						var cardNo;
						var mchType;
						var signModule;
						var signSession;

						cardNo = $('input[name="cardNo"]').val();
						mchType = $('input[type="hidden"][name="mchType"]')
								.val();

						/* ※※※簽章程式開始執行處※※※ */

						// 檢查Applet
						var check;
						check = js.Handler.checkApplet();
						if (!check) {
							return;
						}

						// 設定動作代碼
						$(
								'form[name="resultForm"] input[type="hidden"][name="actionCode"]')
								.val('doSignUp');

						// 檢查是否有卡片資料
						var cardNo;
						cardNo = $('input[name="cardNo"]').val();
						// alert(cardNo);

						// 取得PIN碼
						var pinCode;
						pinCode = $('input[name="pinCode"]').val();

						// 檢查是否有卡片資料
						if (!cardNo) {
							// 讀卡
							var jsonObject;
							// alert(1);
							jsonObject = js.CardReader.getCardInfo(document
									.getElementById('cardReaderMessage'));

							if (jsonObject.state) {
								// 嘗試新增卡片資料
								js.Handler.addCardInfo(jsonObject.cardNo,
										jsonObject.chineseName,
										jsonObject.staffIdentificationID,
										jsonObject.sex, jsonObject.birthDate,
										jsonObject.signCert,
										jsonObject.startDate,
										jsonObject.endDate);

								// 設定控制型態
								$('input[name="controlType"]').val('staff');
								$(this).trigger('click');
							} else {
								var message = js.Handler.getErrorMessage(
										result.message, result.errorType,
										result.errorCode);
								alert(message);
								return;
							}

						} else {
							// 檢查ID是否相同
							var idNo;
							idNo = $('input[name="staffIdentificationID"]')
									.val();

							var jsonObject;

							// 如果是一般卡機，先重新初始化
							if (js.CardReader.cardMachineType == 'HCA') {
								var initResult;
								initResult = js.CardReader.HCA
										.initSession(pinCode);
								if (!initResult.state) {
									var message = js.Handler.getErrorMessage(
											initResult.message,
											initResult.errorType,
											initResult.errorCode);
									alert(message);
									return;
								}
							}

							// 取得基本資料
							jsonObject = js.CardReader.getBaseData();
							if (jsonObject.state) {
								if (idNo != jsonObject.staffIdentificationID) {
									alert('檢查到現在插的卡片與先前的資料不相同\n' + '如您剛剛換過卡片請重新讀卡！');
									return;
								}
							} else {
								var message = js.Handler.getErrorMessage(
										jsonObject.message,
										jsonObject.errorType,
										jsonObject.errorCode);
								alert(message);
								return;
							}

						}

						// 檢查PIN碼
						// alert(pinCode);
						//alert("@@@3");
						if (!pinCode) {
							js.InputBox.acceptTrigger = $(this);
							js.InputBox.setNotify('輸入PIN碼', '請輸入PIN碼用以驗證', '');
							js.InputBox.show();
							js.InputBox.focus();
							return;
						}

						var idNo;
						idNo = $('input[name="staffIdentificationID"]').val();

						if (!idNo) {
							alert('發生錯誤，無法取得登入者的身分證字號！');
						}

						var dialog;
						dialog = confirm('此動作將會連鎖簽章，是否確定開始簽章？\n' + '開始執行後，請耐心等待所有資料簽章完成！');
						if (dialog) {
							// 連鎖簽章
							alert('連鎖簽章-start');
							js.Handler.chainSign(pinCode,
									js.Handler.medicaQuery);
							alert('連鎖簽章-end');

						}

					});

		// 加入ajax查詢按鈕的事件
		$('input[name="doAjaxQuery"]')
				.click(function() {
					var emrCategory = '';
					var patientID;
					//取得醫院代碼
					//alert($('#hospitalselectedValue').val());
					
					// 檢查有無選取資料
						$("input:checked[name='emrType[]']").each(
								function(index, item) {
									emrCategory += ",'" + $(item).val() + "'";
								})
						// emrCategory =
						// $('select[name="emrCategory"]').children('option:selected').val();
						patientID = $('input[name="identificationID"]').val();
						seq = $('input[name="emrSeq"]').val();
						/*
						 * alert('emrCategory='+emrCategory+'=');
						 * alert('identificationID='+patientID+'='); return;
						 */

						if (emrCategory == '' && patientID == '' && seq == '') {
							alert('查詢條件必輸入以下條件之一\n' + '1.身分證字號\n' + '2.表單種類\n' + '3.電子病歷序號');
							return;
						}
						// 檢查開單日/執行日日期格式是否正確
						// 限制格式為YYYY/MM/DD
						// var re = new
						// RegExp("^([0-9]{4})[/]{1}([0-9]{2})[/]{1}([0-9]{2})$");
						var re = new RegExp("^([0-9]{4})([0-9]{2})([0-9]{2})$");// 把/的限制拿掉
						var strDataValue;
						var infoValidation = true;

						var start = $('input[name="medicalRecordDateStart"]')
								.val();// 病例開始日期
						var end = $('input[name="medicalRecordDateEnd"]').val();// 病例結束日期
						var BillDateStart = $('input[name="BillDateStart"]')
								.val();// 開單日開始
						var BillDateEnd = $('input[name="BillDateEnd"]').val();// 開單日結束
						var ExeDateStart = $('input[name="ExeDateStart"]')
								.val();// 執行日開始
						var ExeDateEnd = $('input[name="ExeDateEnd"]').val();// 執行日結束
						var medical = 0;
						var Bill = 0;
						var Exe = 0;
						var total;
						if ((start.length > 0) && (start.length > 0)) {
							medical = 1;
						}
						if (medical != 1) {
							alert('病歷日期為必填查詢條件');
							return;
						}
/*
						if ((BillDateStart.length > 0)
								&& (BillDateEnd.length > 0)) {
							Bill = 1;
						}
						if ((ExeDateStart.length > 0)
								&& (ExeDateEnd.length > 0)) {
							Exe = 1;
						}

						total = medical + Bill + Exe;
						if (total > 1 || total == 0) {
						//	alert('請選擇一組日期查詢條件\n' + '1.病例日期\n' + '2.開單日期\n' + '3.執行日期');
						//	return;
						}
*/
						// 病例開始日期
						if (start.length > 0) {
							start = start.replace(new RegExp("/", "g"), "");// 取代所有的/
							if ((strDataValue = re.exec(start)) != null) {
								var i;
								i = parseFloat(strDataValue[1]);
								if (i <= 0 || i > 9999) { // 年
									infoValidation = false;
								}
								i = parseFloat(strDataValue[2]);
								if (i <= 0 || i > 12) { // 月
									infoValidation = false;
								}
								i = parseFloat(strDataValue[3]);
								if (i <= 0 || i > 31) { // 日
									infoValidation = false;
								}

							} else {
								infoValidation = false;
							}

							if (!infoValidation) {
								alert('病例開始日期錯誤，請輸入 YYYYMMDD 日期格式');
								return;
							}
						}
						// 病例結束日期
						if (end.length > 0) {
							end = end.replace(new RegExp("/", "g"), "");// 取代所有的/
							if ((strDataValue = re.exec(end)) != null) {
								var i;
								i = parseFloat(strDataValue[1]);
								if (i <= 0 || i > 9999) { // 年
									infoValidation = false;
								}
								i = parseFloat(strDataValue[2]);
								if (i <= 0 || i > 12) { // 月
									infoValidation = false;
								}
								i = parseFloat(strDataValue[3]);
								if (i <= 0 || i > 31) { // 日
									infoValidation = false;
								}
							} else {
								infoValidation = false;
							}

							if (!infoValidation) {
								alert('病例結束日期錯誤，請輸入 YYYYMMDD 日期格式');
								return;
							}
						}
						// 開單日開始
						if (BillDateStart.length > 0) {
							BillDateStart = BillDateStart.replace(new RegExp(
									"/", "g"), "");// 取代所有的/
							if ((strDataValue = re.exec(BillDateStart)) != null) {
								var i;
								i = parseFloat(strDataValue[1]);
								if (i <= 0 || i > 9999) { // 年
									infoValidation = false;
								}
								i = parseFloat(strDataValue[2]);
								if (i <= 0 || i > 12) { // 月
									infoValidation = false;
								}
								i = parseFloat(strDataValue[3]);
								if (i <= 0 || i > 31) { // 日
									infoValidation = false;
								}
							} else {
								infoValidation = false;
							}

							if (!infoValidation) {
								alert('開單開始日期錯誤，請輸入 YYYYMMDD 日期格式');
								return;
							}
						}

						// 開單日結束
						if (BillDateEnd.length > 0) {
							BillDateEnd = BillDateEnd.replace(new RegExp("/",
									"g"), "");// 取代所有的/
							if ((strDataValue = re.exec(BillDateEnd)) != null) {
								var i;
								i = parseFloat(strDataValue[1]);
								if (i <= 0 || i > 9999) { // 年
									infoValidation = false;
								}
								i = parseFloat(strDataValue[2]);
								if (i <= 0 || i > 12) { // 月
									infoValidation = false;
								}
								i = parseFloat(strDataValue[3]);
								if (i <= 0 || i > 31) { // 日
									infoValidation = false;
								}
							} else {
								infoValidation = false;
							}

							if (!infoValidation) {
								alert('開單結束日期錯誤，請輸入 YYYYMMDD 日期格式');
								return;
							}
						}

						// 執行日開始
						if (ExeDateStart.length > 0) {
							ExeDateStart = ExeDateStart.replace(new RegExp("/",
									"g"), "");// 取代所有的/
							if ((strDataValue = re.exec(ExeDateStart)) != null) {
								var i;
								i = parseFloat(strDataValue[1]);
								if (i <= 0 || i > 9999) { // 年
									infoValidation = false;
								}
								i = parseFloat(strDataValue[2]);
								if (i <= 0 || i > 12) { // 月
									infoValidation = false;
								}
								i = parseFloat(strDataValue[3]);
								if (i <= 0 || i > 31) { // 日
									infoValidation = false;
								}
							} else {
								infoValidation = false;
							}

							if (!infoValidation) {
								alert('執行開始日期錯誤，請輸入 YYYYMMDD 日期格式');
								return;
							}
						}
						
						// 執行日結束
						if (ExeDateEnd.length > 0) {
							ExeDateEnd = ExeDateEnd.replace(
									new RegExp("/", "g"), "");// 取代所有的/
							if ((strDataValue = re.exec(ExeDateEnd)) != null) {
								var i;
								i = parseFloat(strDataValue[1]);
								if (i <= 0 || i > 9999) { // 年
									infoValidation = false;
								}
								i = parseFloat(strDataValue[2]);
								if (i <= 0 || i > 12) { // 月
									infoValidation = false;
								}
								i = parseFloat(strDataValue[3]);
								if (i <= 0 || i > 31) { // 日
									infoValidation = false;
								}
							} else {
								infoValidation = false;
							}

							if (!infoValidation) {
								alert('執行結束日期錯誤，請輸入 YYYYMMDD 日期格式');
								return;
							}
						}

						// ******************************
						var controlType;
						controlType = $('input[name="controlType"]').val();

						var check;
						check = js.Handler.checkCardInfo();
						if (!check) {
							return;
						}

						// 設定分頁
						$('input[name="pageNumber"]').val('1');

						// 查詢
						// var staffIdentificationID;
						/*
						 * var id; id =
						 * $('input[name="identificationID"]').val();
						 * staffIdentificationID=$('input[name="staffIdentificationID"]').val();
						 * 
						 * if(id!=''){
						 * $('input[name="staffIdentificationID"]').val(''); }
						 */
						js.Handler.ajaxQuery();

						// $('input[name="staffIdentificationID"]').val(staffIdentificationID);

					});
		// 加入整批列印驗紐的事件
		$('input[name="doPrintList"]')
				.click(function() {
					// 定義循覽物件的處理函式
						var eachHandler;
						eachHandler = function(index, item) {
							$(document)
									.queue(
											function() {
												if ($(item).attr('checked')) {
													var row;
													row = $(item).parent('td')
															.parent('tr');

													var rowData;
													rowData = $(row)
															.attr('id')
															.replace("seq_", "");

													// 定義接收到回應後的資料處理函式
												//	alert (rowData);												
													var MainDir = "";
													var isExist = "";
													alert("beffffor checking file exist")
													$.ajax({
														async: false,
										                url: "isfileexist.jsp",
										                data: 'emrseq=' + rowData + '&todo=checkexist',
										                type:"POST",
										                dataType:'text',
										                

										                success: function(msg){										
										              //  	alert(msg);
										                	isExist = msg;
										              //  	alert(isExist);
										                },

										                 error:function(xhr, ajaxOptions, thrownError){ 
										                    alert(xhr.status); 
										                    alert(thrownError); 
										                 }
										            });
													alert("afffffter checking file exist")
												/*	if (!isExist.prototype.trim) {
														isExist.prototype.trim = function () {
														    return this.replace(/^\s+|\s+$/g, '');
														  };
														}
														*/
													//alert("kkkkkk"+isExist)
													if (isExist.replace(/^\s+|\s+$/g, '') == "Y")
													{
														MainDir = "/REPORT/";
													//	alert(MainDir);
													}
													else
													{
														MainDir = "/REPORT1/";
													//	alert(MainDir);
													}
													alert("beforeeeeeeee print ")	
													
											
													var resultHandler;
													resultHandler = function(
															result) {
														var dir1;
														var dir2;
														var dir3;
														dir1 = rowData.substr(
																11, 3);
														dir2 = rowData.substr(
																8, 3);
														dir3 = rowData.substr(
																0, 8);
														var expression;
														var replacement;
														if (result) {
															var win;
															win = window
																	.open(
																			'',
																			'_blank',
																			'toolbar=no,scrollbars=yes,width=600px,height=480px');
															result = result
																	.replace(
																			'<html>',
																			'<html><object id="webBrowser" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" width="0" height="0"></object>');

															expression = '<img src="' + rowData;
															replacement = '<img src="http://'
																	+ window.location.host
																	+ MainDir
																	+ dir1
																	+ '/'
																	+ dir2
																	+ '/'
																	+ dir3
																	+ '/'
																	+ rowData;
															while (result
																	.indexOf(expression) != -1) {
																result = result
																		.replace(
																				expression,
																				replacement);
															}
															alert(expression);
															alert(replacement);
															alert(result);
															/*
															 * alert('<img
															 * src="http://'+window.location.host+'/report/'+dir1+'/'+dir2+'/'+dir3+'/'+rowData);
															 * result=result.replace(/<img
															 * src="/+rowData, '<img
															 * src="http://'+window.location.host+'/report/'+dir1+'/'+dir2+'/'+dir3+'/'+rowData);
															 */
															win.document
																	.writeln(result);
															win.document
																	.close();

															var webBrowser;
															webBrowser = win.document
																	.getElementById('webBrowser');
															/*
															 * alert(webBrowser.type);
															 * if (typeof
															 * webBrowser=='object'){
															 * alert(''); return ; }
															 * 
															 * alert(webBrowser);
															 */
															try {
																webBrowser
																		.execwb(
																				6,
																				2);
															} catch (e) {
																alert('列印發生錯誤，請將網站加入信任網站，設定下載ActiveX。或請與資訊處服務人員聯絡。');
																return;
															}
															// webBrowser.execwb(6,1);
															win.focus();
															win.close();

															// 取消核取
															var checkBox;
															checkBox = $(row)
																	.children(
																			'td')
																	.children(
																			'input[type="checkbox"][name="rowCheckBox[]"]');
															$(checkBox)
																	.removeAttr(
																			"checked");
															js.CheckBoxUtility
																	.changeTitle(
																			checkBox,
																			'取消選取',
																			'選取');
														}

														$(document).dequeue();
													}

													// 提交
													$
															.ajax( {
																success : resultHandler,
																error : function(
																		response) {

																	// 取消核取
																	var checkBox;
																	checkBox = $(
																			row)
																			.children(
																					'td')
																			.children(
																					'input[type="checkbox"][name="rowCheckBox[]"]');
																	$(checkBox)
																			.removeAttr(
																					"checked");
																	js.CheckBoxUtility
																			.changeTitle(
																					checkBox,
																					'取消選取',
																					'選取');
																},
																async : true,
																data : 'dateseq=' + rowData + '&type=html&mode=binary'/**/,
																dataType : 'text',
																timeout : 30000,
																type : 'post',
																url : 'findPDF'
															});

												}
											});
						}

						// 取得勾選的資料
						var checkedList;
						checkedList = $('input[type="checkbox"][name="rowCheckBox[]"]:checked');

						// 巡覽勾選資料
						if (checkedList.length != 0) {
							var dialog;
							dialog = confirm('共選擇了' + checkedList.length + '筆資料，是否確定開始列印？');
							if (dialog) {
								// 逐一送出
								$.each(checkedList, eachHandler);
							}
						} else {
							alert('沒有勾選資料');
						}

					});
		// 加入讀卡按鈕的事件$('input[name="cardReader"]')
		$('span.cardReader').click(function() {
			// 檢查是否為醫事人員
				var loginType;
				loginType = $('input[name="controlType"]').val();
				//alert("loginType=="+loginType);
				if (loginType != 'staff' && loginType != 'medica') {
					alert('您不是醫事人員！');
					return;
				}

				// 檢查Applet
				var check;
				check = js.Handler.checkApplet();
				if (!check) {
					return;
				}

				// 檢查PIN碼
				var pinCode;
				pinCode = $('input[name="pinCode"]').val();
				//alert("pinCode==="+pinCode);
				//alert("@@@4");
				if (!pinCode) {
					js.InputBox.acceptTrigger = $(this);
					js.InputBox.setNotify('輸入PIN碼', '請輸入PIN碼用以驗證', '');
					js.InputBox.show();
					js.InputBox.focus();
					return;
				} else {
					js.CardReader.HCA.initSession(pinCode);
				}

				var jsonObject;
				jsonObject = js.CardReader.getCardInfo(document
						.getElementById('cardReaderMessage'));

				if (!jsonObject) {
					return;
				}

				if (jsonObject.state) {
					// 檢查卡片種類
					if (jsonObject.cardType = 0) {
						// 機構卡
						alert('檢查到插入的卡片為機構卡，無法在本系統上使用！');
						return;
					} else {
						// 人員卡

						// 嘗試新增卡片資料
						js.Handler.addCardInfo(jsonObject.cardNo,
								jsonObject.chineseName,
								jsonObject.staffIdentificationID,
								jsonObject.sex, jsonObject.birthDate,
								jsonObject.signCert, jsonObject.startDate,
								jsonObject.endDate);

						// 20120911 kidd add for test
						// alert(cardIdNo);
						// ============
						// 檢查hard_code_emr資料
						// 檢查身分證字號
						var userIdNo;
						var cardIdNo;
						

						userIdNo = $('input[name="userIdNo"]').val();
						cardIdNo = $('input[name="staffIdentificationID"]').val();
						
						var resultHandler;

						resultHandler = function(result) {

							var jsonResult;
							jsonResult = $.parseJSON(result);
							if (jsonResult.state == null)
							{alert(result);}

							if (jsonResult.state) {
								// alert(jsonResult.message);
								if (jsonResult.message == "") {
									isTest = jsonResult.queryResult;
									changeToId = jsonResult.queryResult2;															
									
								} else {
									isTest = "";
									changeToId = "";
								}
								// ===========
								//alert("isTest=="+isTest);
								//alert("changeToId=="+changeToId);
								if (isTest != "" && isTest == '1') {//onChange
									$('input[name="staffIdentificationID"]').val(changeToId);
								}else{
									if (userIdNo != cardIdNo) {
										alert('卡片資料與登入人員不符！');
										$('input[name="clearQuery"]').trigger('click');
										return;
									}
								}
								//2012/09/11 change position
								// 檢查登入型態
								js.Handler.checkControlType();
								//2013/06/03 tailh 如果病人ID不是空的簽章狀態預設全部
								// 重查畫面資料		
								//js.Handler.staffQuery();

								if($("input[name='identificationID']").val()!="")
								{
									$('input[name="signState"][value="All"]').attr('checked','checked');
									// 查詢
									js.Handler.ajaxQuery();
								}else
								{
									js.Handler.staffQuery();
								}
									
							} else {
								alert(jsonResult.message);
							}
						}

						// 設定控制型態
						// $('input[type="hidden"][name="controlType"]').val('staff');
						// alert($('input[type="hidden"][name="controlType"]').val());
						$.post('query.jsa',
								'actionCode=isTest&staffID=' + cardIdNo,
								resultHandler);// 送資料到QueryController查詢
						/*
						// 檢查登入型態
						js.Handler.checkControlType();
						// 重查畫面資料		
						js.Handler.staffQuery();
						*/
					}
				}
			});

		// 加入全選 CheckBox的事件doCheck
		$('input[name="doCheck"]').click(function() {
			// 取得選取控制CheckBox
				var controlCheckBox;
				controlCheckBox = $('input[name="controlCheckBox"]').eq(0);
				// alert(controlCheckBox);
				if (this.value == '全部選取') {
					this.value = '取消全選';
					$(this).attr('title', '取消選取全部紀錄');

					// 全選紀錄
					js.CheckBoxUtility.checkAllByName(true, 'rowCheckBox[]');

					$(controlCheckBox).attr('checked', 'checked');
					$(controlCheckBox).attr('title', '取消選取全部');
				} else {
					this.value = '全部選取';
					$(this).attr('title', '選取全部紀錄');

					// 取消全選紀錄
					js.CheckBoxUtility.checkAllByName(false, 'rowCheckBox[]');

					$(controlCheckBox).removeAttr('checked');
					$(controlCheckBox).attr('title', '選取全部');
				}
				js.CheckBoxUtility.changeTitleByName('rowCheckBox[]', '取消選取',
						'選取');
				// changeTitle(controlCheckBox,'取消選取全部','選取全部');
			});

		// 身分證字號自動大寫
		$('input[name="identificationID"]').blur(function() {
			var identificationID;

			identificationID = $('input[name="identificationID"]').val();
			// alert(identificationID);
				$('input[name="identificationID"]').val(
						identificationID.toUpperCase());
			});

		// 醫師代碼自動填補
		$('input[name="staffCode"]').blur(function() {
			var length;
			length = $(this).val().length;
			var value;
			value = $(this).val();

			if (value != '') {
				for ( var i = 1; i <= (6 - length); i++) {
					value = '0' + value;
				}
			}
			$(this).val(value);
		});

		// 加入測試按鈕
		$('input[name="doTest"]').click(function() {
			// alert('121321');
				window.open(
						'objectviewer.jsa?dateseq=20100004079204&type=html',
						'_blank');

			});

		// 加入測試按鈕
		$('input[name="doTest1"]').click(function() {
			$.post('query.jsa', 'actionCode=test1', function(result) {
			}); 
		});

		// 加入驗章按鈕事件
		$('input[name="doVerify"]')
				.click(function() {
					$(document).clearQueue();

					// 取得勾選的資料
						var checkedList;
						checkedList = $('input[type="checkbox"][name="rowCheckBox[]"]:checked');

						// 提交簽章資料
						if (checkedList.length == 0) {
							alert('沒有勾選任何簽章資料！');
							return;
						} else {
							var dialog;
							dialog = confirm("共選擇了" + checkedList.length
									+ "筆資料，是否確定開始驗章？");
							if (!dialog) {
								return;
							}
						}

						// 定義接收到資料的處理函式
						var resultHandler = function(result) {
							if (result == null || result == '') {
								alert('發生錯誤，伺服器的處理程序被終止！');
								return;
							}

							var jsonResult;
							jsonResult = $.parseJSON(result);

							var row;
							row = $('tr[id="seq_' + jsonResult.rowData + '"]');

							var column;
							column = $(row).children('td[name="SIGN_STATE"]');
							
							if (jsonResult.state) {
								// 取消核取
								var checkBox;
								checkBox = $(row)
										.children('td')
										.children(
												'input[type="checkbox"][name="rowCheckBox[]"]');
								$(checkBox).removeAttr("checked");
								js.CheckBoxUtility.changeTitle(checkBox,
										'取消選取', '選取');

								// 刪除checkBox
								$(checkBox).remove();
								// 驗章成功
								$(column)
										.html(
												'<img class="ALREADY" alt="驗章完成" src="images/signed_ok.png">');
							} else {
								// 驗章失敗
								var message;
								message = js.Handler.getErrorMessage('驗章失敗！',
										jsonResult.errorType,
										jsonResult.errorCode);
								$(column)
										.html(
												'<img class="ALREADY" alt="' + message + '" src="images/signed_error.png">');
							}

							// 執行佇列函式
							$(document).dequeue();
						};

						// 循覽
						$
								.each(
										checkedList,
										function(index, item) {
											$(document)
													.queue(
															function() {
																var row;
																row = $(item)
																		.parent(
																				'td')
																		.parent(
																				'tr');

																// 加入需要驗章的資料列
																var signState;
																signState = $(
																		row)
																		.children(
																				'td[name="SIGN_STATE"]')
																		.attr(
																				'id');
																
																if (signState == 'ALREADY'
																		|| signState == 'ALREADY_ERROR') {

																	// 顯示狀態
																	var column;
																	column = $(
																			row)
																			.children(
																					'td[name="SIGN_STATE"]');
																	$(column)
																			.html(
																					'進行驗章中...');

																	var rowData;
																	rowData = $(
																			row)
																			.attr(
																					'id')
																			.replace(
																					"seq_",
																					"");
																	
																	// 檢查是否是軟體簽章
																	var softSignFlag = "X";
																	$
																	.ajax( {
																		success :  function(msg){
																			softSignFlag = msg;
														              //      alert(msg);
														                },
																		error : function(
																				response) {
																			// 取消核取
																			var checkBox;
																			checkBox = $(
																					row)
																					.children(
																							'td')
																					.children(
																							'input[type="checkbox"][name="rowCheckBox[]"]');

																			$(
																					checkBox)
																					.removeAttr(
																							"checked");
																			js.CheckBoxUtility
																					.changeTitle(
																							checkBox,
																							'取消選取',
																							'選取');
																			$(
																					column)
																					.html(
																							'請求驗章逾時');
																			$(
																					document)
																					.dequeue();
																		},
																		async : false,
																		data : 'rowData=' + rowData + '&actionCode=checkSoftSign',
																		dataType : 'text',
																		timeout : 30000,
																		type : 'post',
																		url : 'signature.jsa'
																	});
																//	alert ("emrseqaaaaaaaaaaaa = " + rowData);
																	if (softSignFlag == "Y")//軟體驗章
																	{
																		$
																		.ajax( {
																			success : resultHandler,
																			error : function(
																					response) {
																				// 取消核取
																				var checkBox;
																				checkBox = $(
																						row)
																						.children(
																								'td')
																						.children(
																								'input[type="checkbox"][name="rowCheckBox[]"]');

																				$(
																						checkBox)
																						.removeAttr(
																								"checked");
																				js.CheckBoxUtility
																						.changeTitle(
																								checkBox,
																								'取消選取',
																								'選取');
																				$(
																						column)
																						.html(
																								'請求驗章逾時');
																				$(
																						document)
																						.dequeue();
																			},
																			async : false,
																			data : 'rowData=' + rowData + '&actionCode=checkSoftSign',
																			dataType : 'text',
																			timeout : 30000,
																			type : 'post',
																			url : 'http://192.168.3.37/EMRSoft/SignCheck.aspx'
																		});
																	//	alert ("emrseqbbbbbbbbbbbb = " + rowData);
																		// 更新 index table
																		$.ajax({
																			async: false,
															                url: "isfileexist.jsp",
															                data: 'emrseq=' + rowData + '&todo=validateUpdateIndex',
															                type:"POST",
															                dataType:'text',
															                

															                success: function(msg){										
															               // 	alert(msg);
															              //  	isExist = msg;
															              //  	alert(isExist);
															                },

															                 error:function(xhr, ajaxOptions, thrownError){ 
															              //  	 alert("error");
															                //    alert(xhr.status); 
															                 //   alert(thrownError); 
															                 }
															            });
																	//	alert('finishedfffff');
																		
																	}
																	else
																	{
																		
																		// 提交
																		$
																			.ajax( {
																				success : resultHandler,
																				error : function(
																						response) {
																					// 取消核取
																					var checkBox;
																					checkBox = $(
																							row)
																							.children(
																									'td')
																							.children(
																									'input[type="checkbox"][name="rowCheckBox[]"]');

																					$(
																							checkBox)
																							.removeAttr(
																									"checked");
																					js.CheckBoxUtility
																							.changeTitle(
																									checkBox,
																									'取消選取',
																									'選取');
																					$(
																							column)
																							.html(
																									'請求驗章逾時');
																					$(
																							document)
																							.dequeue();
																				},
																				async : true,
																				data : 'rowData=' + rowData + '&actionCode=doVerifySign',
																				dataType : 'text',
																				timeout : 30000,
																				type : 'post',
																				url : 'signature.jsa'
																			});
																	}
																} else {
																	// 取消核取
																	var checkBox;
																	checkBox = $(
																			row)
																			.children(
																					'td')
																			.children(
																					'input[type="checkbox"][name="rowCheckBox[]"]');

																	$(checkBox)
																			.removeAttr(
																					"checked");
																	js.CheckBoxUtility
																			.changeTitle(
																					checkBox,
																					'取消選取',
																					'選取');

																	// 執行佇列函式
																	$(document)
																			.dequeue();
																}
															});
										});

						// 執行佇列函式
						// $(document).dequeue();
					});

		// 加入測試按鈕
		$('input[name="doTest2"]').click(function() {
			$.post('query.jsa', 'actionCode=test2', function(result) {
			});
		});

		// 自動讀卡
		var controlType;
		controlType = $('input[name="controlType"]').val();
		// alert(controlType);
		if ((controlType == 'staff' || controlType == 'medica')
				&& js.CardReader.cardMachineType != '') {
			$('span.cardReader').trigger('click');
			$('input#inputBox_inputArea').focus()
		}
	},

	/**
	 * 通用成員
	 */
	/* 每次執行佇列函式的數量 */
	dequeueCount : 1,
	/* 追蹤數量 */
	traceCount : 5,
	/* 目前追終量 */
	traceCurrent : 0,
	/* 追蹤最小值 */
	traceMinimum : 0,
	/* 追蹤最大值 */
	traceMaximum : 0,
	/* 追蹤平均值 */
	traceAverage : 2,

	/**
	 * 其他通用function
	 */
	trace : function(bySecond) {
		this.traceCurrent++;

		// 判斷是否超過追蹤數量
	if (this.traceCurrent > this.traceCount) {
		// 超過數量

	// 取得平均值
	this.traceAverage = ((this.traceMinimum + this.traceMaximum) / 2.0);

	// 設定最大最小值
	this.traceMinimum = this.traceAverage;
	this.traceMaximum = this.traceAverage;
	this.traceCurrent = 0;
} else {
	// 追蹤數量內

	// 設定最小值
	if (bySecond < this.traceMinimum || this.traceMinimum == 0) {
		this.traceMinimum = bySecond;
	}

	// 設定最大值
	if (bySecond > this.traceMaximum) {
		this.traceMaximum = bySecond;
	}

	// 取得平均值
	this.traceAverage = ((this.traceMinimum + this.traceMaximum) / 2.0);
}

// window.defaultStatus='min='+this.traceMinimum+' max='+this.traceMaximum+'
// Second='+bySecond+' traceAverage='+this.traceAverage;
},

// 間隔執行佇列函式
	traceDequeue : function(byCount) {
		var handler = function() {
			var id;
			function run() {
				$(document).dequeue();
				window.clearTimeout(id);
			}
			// id=setTimeout(run, js.Handler.traceAverage*1000);
			// window.defaultStatus=js.Handler.traceAverage*1000;
			id = setTimeout(run, 2000);
		}

		for ( var i = 1; i <= byCount; i++) {
			handler();
		}
	},

	// 數值格式化
	numberFormatter : function(byValue, byDigit) {
		var temp = String(byValue);
		var dotIndex;
		var integer;
		var decimal;
		dotIndex = temp.indexOf('.');
		// alert(dotIndex);
		if (dotIndex != -1) {
			integer = temp.substring(0, dotIndex);
			if (byDigit == 0) {
				return integer;
			} else {
				decimal = temp
						.substring(dotIndex + 1, (dotIndex + 1 + byDigit));
				return integer + '.' + decimal;
			}
		} else {
			return byValue;
		}
	},

	// 時間間隔格式化
	timeSpanFormatter : function(byValue, byDigit) {
		var temp = String(byValue);
		var dotIndex;
		var integer;
		var decimal;
		var formatted;
		// alert(temp);
		dotIndex = temp.indexOf('.');
		// alert(dotIndex);
		if (dotIndex != -1) {
			integer = temp.substring(0, dotIndex);
			if (integer >= 60.00) {
				// alert('>');
				formatted = Math.floor(integer / 60.00) + '分'
						+ (integer % 60.00);
			} else {
				// alert('<');
				formatted = integer;
			}

			if (byDigit != 0) {
				decimal = temp
						.substring(dotIndex + 1, (dotIndex + 1 + byDigit));
				formatted += '.' + decimal;
			}
			return formatted + '秒';
		} else {
			return byValue;
		}
	},

	// 檢查是否有卡機資料
	checkCardInfo : function() {
		/*
		 * controlType =
		 * $('input[name="staffIdentificationID"]').val('L122121893');
		 * controlType = $('input[name="chineseName"]').val('廖謹正 '); return
		 * true;
		 */

		var controlType;
		controlType = $('input[name="controlType"]').val();
		if (controlType == 'staff' || controlType == 'medica') {
			// 檢查是否有卡片資料
			var cardNo;
			cardNo = $('input[name="cardNo"]').val();
			// alert(cardNo);

			// 檢查是否有卡片資料
			if (!cardNo) {
				alert('請先讀卡！');
				return false;
			} else {
				return true;
			}
		}
		return true;
	},

	// 執行指定數量的佇列函式
	dequeue : function(byCount) {
		for ( var i = 1; i <= byCount; i++) {
			$(document).dequeue();
		}
	},

	// 取得錯誤連結
	getErrorTag : function(byErrorCode) {
		var tag;
		tag = '<span class="errorCode" id="' + byErrorCode + '">['
				+ byErrorCode + ']</span>';
		return tag;
	},

	// 嘗試建立卡片資料
	addCardInfo : function(cardNo, userName, userPersonalID, userSex,
			userBirthday, signCert, cardStartDate, cardEndDate) {

		// 提交
		$.ajax( {
			async : true,
			data : '&actionCode=addCardInfo' + '&cardNo=' + cardNo
					+ '&userName=' + userName + '&userPersonalID='
					+ userPersonalID + '&userSex=' + userSex + '&userBirthday='
					+ userBirthday + '&signCert='
					+ encodeURIComponent(signCert) + '&cardStartDate='
					+ cardStartDate + '&cardEndDate=' + cardEndDate,
			dataType : 'text',
			timeout : 5000,
			type : 'post',
			url : 'action.jsa'
		});

	},

	counter : null,

	ajaxQuery : function() {
		var startTime = new Date();
		var controlType;
		var selectEmrType = "";	
		controlType = $('input[name="controlType"]').val();

		// 把選取的值傳出去
	$("input:checked[name='emrType[]']").each(function(index, item) {
		selectEmrType += ",'" + $(item).val() + "'";
	})

	$('input[name="doAjaxQuery"]').attr('disabled', 'disabled');
	js.Handler.counter = null;

	// 定義接收到回應後的資料處理函式
	var resultHandler;
	resultHandler = function(result) {
		// $('input[name="counter"]').value(result);//.replace(/\"/ig, '\''));

		if (result == null || result == '') {
			alert('發生錯誤，伺服器的處理程序被終止！');
			// 顯示內容
			$('div#queryResult').html('發生錯誤，伺服器的處理程序被終止！');

			// 啟用查詢按鈕
			$('input[name="doAjaxQuery"]').removeAttr('disabled', 'disabled');
			return;
		}

		// alert(result);
		var jsonResult;
		jsonResult = $.parseJSON(result);

		if (jsonResult.state) {
			// 設定計數器
			js.Handler.counter = jsonResult.counter;
			// 20100602 mark by changfy 修改查詢條件,醫師可用病患身分證ID查
			if (controlType == 'staff' || controlType == 'medica') {
				var counter = js.Handler.counter;
				var id;
				id = $('input[name="identificationID"]').val();
				if (counter.total == 0 && id != '' && id != '%') {
					// alert('醫事人員僅可查詢本身製作及簽章之病歷' + '\n' +
					// '您不曾為此病患製作電子病歷，請再次確認');
					alert('很抱歉查無此病患電子病歷' + '\n' + '請重新選擇您所查詢的條件');
				}
			}

			// 顯示內容
			$('div#queryResult').html(jsonResult.queryResult);
			// $('input[name="test"]').val(jsonResult.queryResult);

			// 顯示資訊
			Handler.showStatus();

			// 事件連接
			Handler.otherEventHandle();

			// 計算查詢時間
			var endTime = new Date();
			var timeSpan;
			timeSpan = (endTime.getTime() - startTime.getTime()) / 24 / 60;
			timeSpan = js.Handler.numberFormatter(timeSpan, 2);
			window.defaultStatus = '此次查詢共花費' + timeSpan + '秒';

		} else {
			$('div#queryResult').html(jsonResult.message);
		}

		// 啟用查詢按鈕		
		$('input[name="doAjaxQuery"]').removeAttr('disabled', 'disabled');

	};

	// 清除畫面並顯示訊息
	var message;
	message = '<img alt="loading.." src="images/loading.gif">查詢資料中！請稍候！'
	$('div#queryResult').html(message);
	$('div#statusMessage').html('');
	$('div#signedMessage').html('');	
	//alert("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
	// 提交	
	$.post('query.jsa', $('form[name="queryForm"]').serialize()
			+ '&actionCode=doQuery' + '&selectEmrType=' + selectEmrType+'&controlType='+controlType, resultHandler);
},

ajaxPageQuery : function() {
	var startTime = new Date();
	js.Handler.lock();
	// 定義接收到回應後的資料處理函式
	var resultHandler;
	resultHandler = function(result) {
		// alert(result);
		if (result == null || result == '') {
			alert('發生錯誤，伺服器的處理程序被終止！');
			// 顯示內容
			$('div#queryResult').html('發生錯誤，伺服器的處理程序被終止！');
			return;
		}

		// alert(result);
		var jsonResult;
		jsonResult = $.parseJSON(result);

		if (jsonResult.state) {
			// 顯示內容
			$('div#queryResult').html(jsonResult.queryResult);
			// $('input[name="test"]').val(jsonResult.queryResult);

			// 顯示資訊
			Handler.showStatus();

			// 事件連接
			Handler.otherEventHandle();

			// 計算查詢時間
			var endTime = new Date();
			var timeSpan;
			timeSpan = (endTime.getTime() - startTime.getTime()) / 24 / 60;
			timeSpan = js.Handler.numberFormatter(timeSpan, 2);
			window.defaultStatus = '此次查詢共花費' + timeSpan + '秒';
		} else {
			$('div#queryResult').html(jsonResult.message);
		}

		js.Handler.unlock();
	};

	// 清除畫面並顯示訊息
	var message;
	message = '<img alt="loading.." src="images/loading.gif">查詢資料中！請稍候！'
	$('div#queryResult').html(message);
	$('div#statusMessage').html('');
	$('div#signedMessage').html('');

	// 提交
	$
			.post(
					'query.jsa',
					$('form[name="queryForm"]').serialize() + '&actionCode=doPageQuery',
					resultHandler);

},

pageQuery : function() {
	var startTime = new Date();

	js.Handler.lock();

	// 定義接收到回應後的資料處理函式
	var resultHandler;
	resultHandler = function(result) {
		// alert(result);
		if (result == null || result == '') {
			alert('發生錯誤，伺服器的處理程序被終止！');
			// 顯示內容
			$('div#queryResult').html('發生錯誤，伺服器的處理程序被終止！');
			return;
		}

		// alert(result);
		var jsonResult;
		jsonResult = $.parseJSON(result);

		if (jsonResult.state) {
			// 顯示內容
			$('div#queryResult').html(jsonResult.queryResult);
			// $('input[name="test"]').val(jsonResult.queryResult);

			// 顯示資訊
			Handler.showStatus();

			// 事件連接
			Handler.otherEventHandle();

			// 計算查詢時間
			var endTime = new Date();
			var timeSpan;
			timeSpan = (endTime.getTime() - startTime.getTime()) / 24 / 60;
			timeSpan = js.Handler.numberFormatter(timeSpan, 2);
			window.defaultStatus = '此次查詢共花費' + timeSpan + '秒';
		} else {
			$('div#queryResult').html(jsonResult.message);
		}
		js.Handler.unlock();

	};

	// 清除畫面並顯示訊息
	var message;
	message = '<img alt="loading.." src="images/loading.gif">查詢資料中！請稍候！'
	$('div#queryResult').html(message);
	$('div#statusMessage').html('');
	$('div#signedMessage').html('');

	// 提交
	$
			.ajax( {
				async : false,
				success : resultHandler,
				error : function(response) {
					alert('查詢單頁記錄逾時');
				},
				data : $('form[name="queryForm"]').serialize() + '&actionCode=doPageQuery',
				dataType : 'text',
				timeout : 600000,
				type : 'post',
				url : 'query.jsa'
			});

	/*
	 * // 提交 $.post('query.jsa', $('form[name="queryForm"]').serialize() +
	 * '&actionCode=doPageQuery', resultHandler);
	 */

},

query : function() {
	var startTime = new Date();

	js.Handler.lock();
	// 定義接收到回應後的資料處理函式
	var resultHandler;
	resultHandler = function(result) {
		// alert(result);
		if (result == null || result == '') {
			alert('發生錯誤，伺服器的處理程序被終止！');
			// 顯示內容
			$('div#queryResult').html('發生錯誤，伺服器的處理程序被終止！');
			return;
		}

		// alert(result);
		var jsonResult;
		jsonResult = $.parseJSON(result);

		if (jsonResult.state) {
			// 設定計數器
			js.Handler.counter = jsonResult.counter;

			// 顯示內容
			$('div#queryResult').html(jsonResult.queryResult);
			// $('input[name="test"]').val(jsonResult.queryResult);

			// 顯示資訊
			Handler.showStatus();

			// 事件連接
			Handler.otherEventHandle();

			// 計算查詢時間
			var endTime = new Date();
			var timeSpan;
			timeSpan = (endTime.getTime() - startTime.getTime()) / 24 / 60;
			timeSpan = js.Handler.numberFormatter(timeSpan, 2);
			window.defaultStatus = '此次查詢共花費' + timeSpan + '秒';
		} else {
			$('div#queryResult').html(jsonResult.message);
		}
		js.Handler.unlock();
	};

	// 清除畫面並顯示訊息
	var message;
	message = '<img alt="loading.." src="images/loading.gif">查詢資料中！請稍候！'
	$('div#queryResult').html(message);
	$('div#statusMessage').html('');
	$('div#signedMessage').html('');

	// 提交
	$.ajax( {
		async : false,
		success : resultHandler,
		error : function(response) {
			alert('查詢記錄逾時');
		},
		data : $('form[name="queryForm"]').serialize() + '&actionCode=doQuery',
		dataType : 'text',
		timeout : 600000,
		type : 'post',
		url : 'query.jsa'
	});

	// $.post('query.jsa',$('form[name="queryForm"]').serialize()+'&actionCode=doQuery',resultHandler);
},

lock : function() {
	$('input[name="doAjaxMedicaSignUp"]').attr('disabled', 'disabled');
	$('input[name="doAjaxQuery"]').attr('disabled', 'disabled');
},
unlock : function() {
	$('input[name="doAjaxMedicaSignUp"]').removeAttr('disabled', 'disabled');
	$('input[name="doAjaxQuery"]').removeAttr('disabled', 'disabled');
},

// 檢查登入型態
	checkControlType : function() {
		// 隱藏功能
	// $('input[type="button"][name="doAjaxSignUp"]').hide();
	// $('input[type="button"][name="doPrintList"]').hide();

	// 檢查登入型態
	var controlType;
	controlType = $('input[name="controlType"]').val();
	// alert(controlType);
	if (!controlType || controlType == '') {
		alert('無法取得登入型態！');
		window.location.href = 'login.jsp';
		return false;
	} else if (controlType == 'staff' || controlType == 'medica') {

		// 檢查ID
		var id;
		id = $('input[name="userIdNo"]').val();
		if (id == '') {
			alert('無法取得醫事人員身分證字號！');
			window.location.href = 'login.jsp';
			return false;
		}

		// 更改選取狀態為未簽章
		$('input[name="signState"][value="Yet"]').attr('checked', 'checked');
	} else if (controlType == 'manage' || controlType == 'admin') {
		$('input[name="doPrintList"]').show();
		$('table.queryConditionsTable tr#staffCodeRow').show();
		$('table.queryConditionsTable tr#emrSeqRow').show();
	}
	// alert(controlType);
	// 載入選單
	if (controlType != 'staff' && controlType != 'medica') {
		$("div#menu").load("menu.jsp #menu table");
		js.MenuHandler.readyEventHandle();
	}

	// 檢查權限
	var authority;
	authority = $('input[name="authority"]').val();
	if (!authority) {
		return;
	}
	authority = authority.replace(/'/ig, '"');

	// alert(authority);

	if (!authority) {
		return;
	}

	var jsonResult;
	jsonResult = $.parseJSON(authority);
	// alert(jsonResult);

	// 顯示簽章功能
	if (jsonResult.EMR_01) {
		$('input[type="button"][name="doAjaxSignUp"]').show();
	}

	// 顯示列印功能
	if (jsonResult.EMR_02) {
		$('input[type="button"][name="doPrintList"]').show();
	}

	// 顯示驗章功能
	if (jsonResult.EMR_06) {
		$('input[type="button"][name="doVerify"]').show();
	}

	// 顯示給藥簽章功能
	if (jsonResult.EMR_07) {
		$('input[type="button"][name="doAjaxMedicaSignUp"]').show();
		$('input[type="button"][name="doOldMedicaQuery"]').show();
		// 修改登入腳色====暫時性====
		//alert("gogogggggggggggggggggggggggg");
		 $('input[name="controlType"]').val('medica');
		// alert($('input[name="controlType"]').val());
	}

	if (jsonResult.EMR_03) {
	}

	return true;
},

// 檢查Applet是否可以正常執行
	checkApplet : function() {
		// 檢查登入型態
		var controlType;
		controlType = $('input[name="controlType"]').val();
		if (controlType != 'staff' && controlType != 'medica') {
			return;
		}

		// 檢查applet是否可以執行

		// 先檢查一般卡機
		var temp;
		try {

			temp = js.CardReader.HCA.initModule();
			// alert(temp.state);
			js.CardReader.HCA.closeModule();
			if (!temp.state && temp.errorCode == '9056') {
				// 檢查健保局卡機
				try {
					temp = hcacs.GetErrorCode();
					js.CardReader.cardMachineType = 'HCACS';
					$('input[name="cardMachineType"]').val('瑛茂卡機');
				} catch (e) {
				}
			} else {
				js.CardReader.cardMachineType = 'HCA';
				$('input[name="cardMachineType"]').val('一般卡機');
			}

		} catch (e) {
			// alert(e.message);
			// 檢查健保局卡機
			try {
				temp = hcacs.GetErrorCode();
				js.CardReader.cardMachineType = 'HCACS';
				$('input[name="cardMachineType"]').val('瑛茂卡機');
			} catch (e) {
			}
		}

		if (js.CardReader.cardMachineType == '') {
			var message;
			message = '檢查到這個網頁上的卡機功能無法使用，如您繼續使用則無法正常使用卡機功能！\n' + '1. 請聯絡資訊人員確認是否已安裝JRE\n' + '2. 請檢查是否已經有 開啟相同頁面，卡機功能無法同時處理兩個頁面';
			$('applet#hcacs').attr('width', 100);
			$('applet#hcacs').attr('hight', 100);
			$('applet#hca').attr('width', 100);
			$('applet#hca').attr('hight', 100);
			// alert(e.message);
			alert(message);
			return false;
		} else {
			return true;
		}

	},

	// 取得錯誤訊息
	getErrorMessage : function(byErrorMessage, byErrorType, byErrorCode) {
		var jsonResult;
		$.ajax( {
			success : function(response) {
				jsonResult = $.parseJSON(response)
			},
			error : function(response) {
				jsonResult = new object();
				jsonResult.state = false;
				jsonResult.message = '取得錯誤說明失敗！'
			},
			async : false,
			data : 'actionCode=doGetErrorMessage' + '&errorType=' + byErrorType
					+ '&errorCode=' + byErrorCode,
			dataType : 'text',
			timeout : 3000,
			type : 'post',
			url : 'query.jsa'
		});
		return byErrorMessage + '[' + byErrorCode + '-' + jsonResult.message
				+ ']';
	},

	// 醫事人員專用查詢功能
	staffQuery : function() {
		// 清除畫面資料
		var start;
		var end;
		var id;
		var category;
		start = $('input[name="medicalRecordDateStart"]').val();
		end = $('input[name="medicalRecordDateEnd"]').val();
		id = $('input[name="identificationID"]').val();
		category = $('select[name="emrCategory"]').val();

		loginType = $('input[name="controlType"]').val();

		if (loginType == 'medica') {
			$('input[name="medicalRecordDateStart"]').val('2011/04/13');
		} else {
			$('input[name="medicalRecordDateStart"]').val('');
		}
		$('input[name="medicalRecordDateEnd"]').val('');
		$('input[name="identificationID"]').val('');
		$('select[name="emrCategory"]').val('');

		// 重查畫面資料
		js.Handler.ajaxQuery();

		// 重設
		$('input[name="medicalRecordDateStart"]').val(start);
		$('input[name="medicalRecordDateEnd"]').val(end);
		$('input[name="identificationID"]').val(id);
		$('select[name="emrCategory"]').val(category);
	},

	// 給藥人員專用查詢功能
	medicaQuery : function() {
		// 清除畫面資料
		var start;
		var end;
		var id;
		var category;
		start = $('input[name="medicalRecordDateStart"]').val();
		end = $('input[name="medicalRecordDateEnd"]').val();
		id = $('input[name="identificationID"]').val();
		category = $('select[name="emrCategory"]').val();

		$('input[name="medicalRecordDateStart"]').val('');
		$('input[name="medicalRecordDateEnd"]').val('');
		$('input[name="identificationID"]').val('');
		$('select[name="emrCategory"]').val('');

		// 重查畫面資料
		js.Handler.ajaxQuery();

		// 重設
		$('input[name="medicalRecordDateStart"]').val(start);
		$('input[name="medicalRecordDateEnd"]').val(end);
		$('input[name="identificationID"]').val(id);
		$('select[name="emrCategory"]').val(category);
	},

	// 檢查Cookies
	checkCookies : function() {
		// 檢查登入型態
		var controlType;
		controlType = $('input[name="controlType"]').val();
		// alert(controlType + '' + js.CardReader.cardMachineType)

		$(function() {
			// 檢查Cookie是否存在
			// alert($.cookie("isLogin"));
			if ($.cookie("isLogin") == null) {
				// 不存在，設置
				var days = 1;
				var expireDate = new Date();
				expireDate.setDate(expireDate.getTime()
						+ (days * 24 * 60 * 60 * 1000));
				$.cookie("isLogin", true);
				$.cookie("count", 1);
			} else {
				if ((controlType == 'staff' || controlType == 'medica')
						&& js.CardReader.cardMachineType == 'HCACS') {
					// 存在，關閉網站
					alert('請勿重新整理或重複開啟簽章系統！');
					window.close();
					$('applet[name="hcacs"]').remove();
					$('applet[name="hca"]').remove();
				}
			}
		});

		/*
		 * //檢查Cookie是否存在 var index; index
		 * =document.cookie.indexOf('isLogin=true'); alert(index + ' '
		 * +document.cookie.length); if (index!=-1){ //存在，關閉網站
		 * alert('請勿重新整理或重複開啟簽章系統！'); window.close(); }else{ //不存在，設置 var
		 * days=1; var expireDate=new Date();
		 * expireDate.setDate(expireDate.getTime()+(days*24*60*60*1000));
		 * document.cookie='isLogin=true;expires='+expireDate +'path=EMR_Web/'; }
		 */

	},

	// 簽章完成，將計數器前進/後退刻度
	alterCounter : function(byRow) {
		// 總計數
		var counter = js.Handler.counter;
		// 單種類計數
		var category = counter.category;

		// 判斷是否為逾時
		var overdue;
		var isOverdue;
		overdue = $(byRow).attr('class');

		if (overdue.indexOf('signState_overdue') != -1) {
			isOverdue = true;
		} else {
			isOverdue = false;
		}

		// 簽章完成，將已簽+1、未簽-1
		counter.signed++;
		counter.wait--;
		if (isOverdue) {
			counter.overdueSigned++;
			counter.overdueWait--;
		}

		// 單種類簽章數
		var typeName;
		typeName = $(byRow).children('td[name="EMR_TYPE_NAME"]').text();

		var index;
		// alert($.toJSON(counter.categoryKey));
		// alert($.inArray(typeName, counter.categoryKey));
		if (counter.categoryKey) {
			index = $.inArray(typeName, counter.categoryKey);

			if (index != -1) {
				category[index].signed++;
				category[index].wait--;
			}
		}

		// 顯示附加訊息
		js.Handler.showStatus();

	},

	// 顯示附加訊息
	showStatus : function() {
		if (js.Handler.counter) {
			var counter = js.Handler.counter;
			// 總計數
			var message;
			message = '簽章狀態-' + '<br/>全部待簽數：' + counter.wait + '<br/>逾時待簽數：'
					+ counter.overdueWait;
			$('div#statusMessage').html(message);

			// alert( counter.category.length);

			// 單種類計數
			var category = counter.category;
			// var temp= $.toJSON(category);
			// alert(temp);
			message = '<table name="statusResultTable" class="statusResultTable">';
			message += '<tr class="head"><td>表單分類</td><td>已簽</td><td>未簽</td>';

			for ( var i = 0; i < category.length; i++) {
				message += '<tr><td>' + category[i].typeName
						+ '</td><td class="wait">' + category[i].signed
						+ '</td><td class="total">' + category[i].wait
						+ '</td></tr>';
			}
			message += '<tr><td>總表單數</td><td class="wait">' + counter.signed
					+ '</td><td class="total">' + counter.wait + '</td></tr>';
			message += '</table>';

			$('div#signedMessage').html(message);

		} else {
			$('div#statusMessage').html('無法取得計數資料');
			$('div#signedMessage').html('無法取得計數資料');
		}
	}

/*
 * //連鎖簽章 chainSign:function(byPinCode,byReQueryMethod){ var check; check =
 * js.Handler.checkCardInfo(); if (!check){ return; } // 取得參數 var cardNo; var
 * mchType; var signModule; var signSession;
 * 
 * cardNo = $('input[name="cardNo"]').val(); mchType =
 * $('input[type="hidden"][name="mchType"]').val(); // 定義接收到回應後的資料處理函式 var
 * resultHandler; resultHandler = function(result){ if (result == null || result ==
 * ''){ alert('發生錯誤，伺服器的處理程序被終止！'); return; } // alert(result); // return; //
 * 檢查是否有取得原文 var jsonResult; jsonResult = $.parseJSON(result);
 * 
 * var row; row = $('tr[id="seq_' + jsonResult.rowData + '"]');
 * 
 * var column; column = $(row).children('td[name="SIGN_STATE"]');
 * 
 * if (jsonResult.state){ // 取得成功 // 開始簽章 var signResult; // 設定訊息
 * js.StatusBox.setNotify('處理資料' + jsonResult.rowData + '...','開始簽章...');
 * $(column).html('開始簽章...'); // 執行佇列函式
 * js.Handler.traceDequeue(js.Handler.dequeueCount); // 簽章 //
 * alert(jsonResult.plain); //
 * signResult=js.CardReader.HCACS.csSignData(jsonResult.plain); if
 * (js.CardReader.cardMachineType == 'HCACS'){ // alert(jsonResult.plain);
 * signResult = js.CardReader.HCACS.csSignData(jsonResult.plain); }else{
 * signResult = js.CardReader.HCA.signData(jsonResult.plain); } // 追蹤簽章時間
 * js.Handler.trace(signResult.timeSpan); // alert(); // 執行佇列函式 //
 * js.Handler.dequeue(js.Handler.dequeueCount); // 取得該元素的偏移量 // var position =
 * $(row).position(); // //$(row).scrollTop(position.top ); if // (position){
 * window.scrollTo(0,position.top); } //
 * 
 * $(column).html('準備更新伺服器資料...'); // 設定訊息 js.StatusBox.setNotify('處理資料' +
 * jsonResult.rowData + '...','簽章完成(耗時' + signResult.timeSpan + '秒)<br/>更新伺服器資料...'); //
 * 定義接收處理函式 var resultHandler2 = function(result){ // alert(result);
 * 
 * if (result == null || result == ''){ alert('發生錯誤，伺服器的處理程序被終止！'); return; }
 * 
 * $(column).html('取得狀態...'); jsonResult = $.parseJSON(result);
 * 
 * if (jsonResult.accept){ // 簽章成功 var row; row = $('tr[id="seq_' +
 * jsonResult.rowData + '"]'); // 取消核取 var checkBox; checkBox =
 * $(row).children('td').children('input[type="checkbox"][name="rowCheckBox[]"]');
 * 
 * $(checkBox).removeAttr("checked"); js.CheckBoxUtility.changeTitle(checkBox,
 * '取消選取', '選取'); // 刪除checkBox $(checkBox).remove(); // 刪除狀態
 * $(row).removeAttr('state');
 * 
 * if (jsonResult.state){ // 表示狀態正常 $(column).html('簽章完成！') // 設定標題與訊息
 * js.StatusBox.setNotify('處理資料' + jsonResult.rowData + '...','簽章完成！'); //
 * 填入回應資料 $(row).children('td[name="SIGN_STATE"]').html(jsonResult.signState);
 * $(row).children('td[name="SIGN_STATE"]').attr('id',jsonResult.signState)
 * $(row).children('td[name="SIGN_DATE"]').html(jsonResult.signDate);
 * 
 * //修改counter js.Handler.alterCounter(row); }else{ var message; message =
 * js.Handler.getErrorMessage('錯誤！',jsonResult.errorType,jsonResult.errorCode);
 * 
 * $(column).html('簽章完成！但無法取得資訊'); // 設定標題與訊息
 * js.StatusBox.setNotify('簽章完成！但無法取得資訊' + '<br/>' + message); } // 顯示資訊
 * js.Handler.showStatus(); // 設定進度 js.StatusBox.step(true); }else{ var message; //
 * message='錯誤！'+jsonResult.message+jsonResult.errorCode; message =
 * js.Handler.getErrorMessage('錯誤！', jsonResult.errorType,jsonResult.errorCode);
 * $(column).html(message); // 設定標題與訊息 js.StatusBox.setNotify('處理資料' +
 * signResult.rowData + '...',message); // 設定進度 js.StatusBox.step(false); } //
 * 執行佇列函式 // js.Handler.dequeue(js.Handler.dequeueCount); };
 * 
 * if (signResult.state){ $(column).html('提交伺服器資料...');
 * $('input[name="text"]').val(signResult.signedData); // 提交 $.ajax({ success :
 * resultHandler2, error : function(response){ // 取消核取 var checkBox; checkBox =
 * $(row).children('td').children('input[type="checkbox"][name="rowCheckBox[]"]'); //
 * 設定進度 js.StatusBox.step(false);
 * 
 * $(checkBox).removeAttr("checked");
 * js.CheckBoxUtility.changeTitle(checkBox,'取消選取','選取');
 * $(column).html('請求簽章完成逾時'); $(document).dequeue(); }, async : true, data :
 * 'actionCode=doSignAfter' + '&rowData=' + jsonResult.rowData + '&signedPlain=' +
 * encodeURIComponent(signResult.signedData) + '&cardNo=' + cardNo, dataType :
 * 'text', timeout : 10000, type : 'post', url : 'signature.jsa' } );
 * 
 * }else{ var message = js.Handler.getErrorMessage('簽章失敗',
 * result.errorType,result.errorCode);
 * 
 * $(column).html(message); // 設定標題與訊息 js.StatusBox.setNotify('處理資料' +
 * jsonResult.rowData + '...',message); // 設定進度 js.StatusBox.step(false); }
 * }else{ var message = js.Handler.getErrorMessage('取得待簽檔案失敗',
 * jsonResult.errorType,jsonResult.errorCode);
 * 
 * $(column).html(message); // 設定標題與訊息 js.StatusBox.setNotify('處理資料' +
 * jsonResult.rowData + '...',message); // 設定進度 js.StatusBox.step(false); //
 * 執行佇列函式 js.Handler.traceDequeue(js.Handler.dequeueCount); } }; // 定義循覽物件的處理函式
 * var eachHandler; eachHandler = function(index, item){ $(document).queue(
 * function(){ if ($(item).attr('checked')){ var row; row =
 * $(item).parent('td').parent('tr'); if ($(row).attr('state') == 'onSignUp'){ //
 * 正在簽章，不做處理 return; } // 增加狀態 $(row).attr('state','onSignUp'); var column;
 * column = $(row).children('td[name="SIGN_STATE"]');
 * $(column).html('取得簽章資料...');
 * 
 * var rowData; rowData = $(row).attr('id').replace("seq_", ""); // 設定標題與訊息
 * js.StatusBox.setNotify('處理資料' + rowData + '...','取得簽章資料...'); // 提交 $.ajax({
 * success : resultHandler, error : function(response){ // 取消核取 var checkBox;
 * checkBox =
 * $(row).children('td').children('input[type="checkbox"][name="rowCheckBox[]"]'); //
 * 設定進度 js.StatusBox.step(false);
 * 
 * $(checkBox).removeAttr("checked");
 * js.CheckBoxUtility.changeTitle(checkBox,'取消選取','選取');
 * $(column).html('請求待簽檔案逾時'); $(document).dequeue(); }, async : true, data :
 * 'rowData=' + rowData + '&actionCode=doGetPlain', dataType : 'text', timeout :
 * 10000, type : 'post', url : 'signature.jsa' } ); } } ); }
 * 
 * 
 * while (true){ // ※※※查詢記錄※※※ byReQueryMethod();
 * 
 * //※※※全選※※※ $('input[name="doCheck"]').trigger('click');
 * 
 * //※※※取得勾選的資料※※※ var checkedList; checkedList =
 * $('input[type="checkbox"][name="rowCheckBox[]"]:checked'); // 提交簽章資料 if
 * (checkedList.length == 0){ alert('您沒有任何簽章資料！'); break; }else{ // 重設StatusBox
 * js.StatusBox.reset(); // 顯示StatusBox js.StatusBox.show(); // 設定標題與訊息
 * js.StatusBox.setNotify('檢查卡機狀態', '驗證PIN碼...'); // 驗pin碼 var result; if
 * (js.CardReader.cardMachineType == 'HCACS'){ result =
 * js.CardReader.HCACS.hcaVerifyPIN(byPinCode); }else{ result =
 * js.CardReader.HCA.initSession(byPinCode); } // 驗pin碼是否通過 if (result.state){ //
 * 設定訊息 js.StatusBox.setMessage(result.message); // 設定最大值
 * js.StatusBox.maximumValue = checkedList.length; // 設定總筆數
 * js.StatusBox.setAllCount(checkedList.length); // 設定選項
 * js.StatusBox.setCloseOption(false); js.StatusBox.setCancelOption(true); //
 * 設定狀態寬度 $('table.resultTable td.SIGN_STATE').eq(0).css('width', '100px'); //
 * 逐一送出 $.each(checkedList, eachHandler); // 執行佇列函式
 * js.Handler.traceDequeue(js.Handler.dequeueCount - 1); //
 * js.Handler.dequeue(js.Handler.dequeueCount-1); // 隱藏StatusBox //
 * js.StatusBox.hide(); }else{ js.StatusBox.setCloseOption(true);
 * js.StatusBox.setCancelOption(false);
 * 
 * var message = js.Handler.getErrorMessage(result.message,
 * result.errorType,result.errorCode); // 設定訊息 js.StatusBox.setNotify('發生錯誤',
 * message); } } } }
 */
}
