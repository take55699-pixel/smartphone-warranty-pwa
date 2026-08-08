(function(){
  const rows=window.WARRANTY_DATA||[];
  const patch=(brand,changes)=>{
    const item=rows.find(x=>x.brand===brand);
    if(item) Object.assign(item,changes);
  };

  // povo 2.0: existing subscribers only; current exchange burden is explicit by OS.
  patch("povo 2.0 オンライン/サブ",{
    cost:"交換時負担：Android 11,000円/回、iPhone 22,000円/回。",
    note:"新規申込は2023年7月31日で終了。既加入者のみ利用可能。盗難・紛失は対象外。"
  });

  // Rakuten Mobile: Rakuten Certified iPhones became eligible for Replacement Warranty Plus & Appliance Coverage on 2026-06-17.
  patch("楽天モバイル MNO",{
    service:"購入Android・モバイルルーター／Rakuten認定中古iPhone：スマホ交換保証プラス & 家電補償 / 新品iPhone：AppleCare系 / 持込：持ち込みスマホあんしん保証",
    monthly:"購入Android等：980 / 1,180 / 1,380 / 1,580円/月（製品価格別） / Rakuten認定中古iPhone：1,310 / 1,490 / 1,650円/月 / 持込：715〜1,309円/月 / 新品iPhone：機種別",
    cost:"スマホ交換保証プラス & 家電補償：6,600円または12,900円 / 持込：6,600円または12,100円",
    coverage:"購入Android・モバイルルーター／Rakuten認定中古iPhone：故障・破損・水濡れ・盗難・紛失 / 持込：破損・全損・水没等",
    theft:"スマホ交換保証プラス & 家電補償：○（盗難・紛失） / 持込：×",
    note:"2026年6月17日からRakuten認定中古iPhoneもスマホ交換保証プラス & 家電補償の対象。スマホ交換保証は年3回まで、うち盗難・紛失は年2回まで。"
  });

  // BIGLOBE: the service cannot be subscribed to standalone.
  patch("BIGLOBE mobile MVNO",{
    join:"BIGLOBEモバイルのSIMまたは一部サービスとの同時申込時に受付。本サービス単独での申込は不可。保証開始は原則申込月の翌月1日。解約後の再申込不可。",
    note:"対象端末は90日以内にBIGLOBEモバイルSIMで通信実績が必要。故障・破損発生日から10日を超えた申出は受付不可。"
  });

  // AEON Mobile: a dedicated bring-your-own-device warranty is currently offered.
  patch("イオンモバイル MVNO",{
    byod:"yes",
    service:"購入端末：イオンスマホ安心保証 / 持込端末：イオンモバイル持ちこみ保証",
    monthly:"購入端末：385円 / 495円/月（端末別） / 持込：Android・Windows 605円/月、iOS 715円/月",
    cost:"購入端末：有償交換4,400円 / 7,700円など端末別、年2回まで / 持込：修理0円、Android・Windows交換1回目4,400円・2回目8,800円、iOS交換1回目・2回目とも13,200円",
    coverage:"購入端末：自然故障・水濡れ・画面割れ・破損等 / 持込：自然故障・水濡れ・破損",
    bring:"○ 専用の「イオンモバイル持ちこみ保証」あり。イオンモバイル回線の新規・MNP契約と同時加入が基本。所定の端末診断が必要。",
    theft:"× 購入端末向け・持込向けとも盗難・紛失は対象外",
    join:"購入端末向けはイオンモバイル購入端末で購入日から14日以内。持込保証は新規・MNP契約と同時加入が基本で、端末を持参できない場合などは利用開始日から14日以内の店頭手続きが必要。",
    note:"持込保証はSIM1枚につき登録端末1台。技適・正常動作など条件あり。持込保証のみの単独加入は不可。",
    links:[
      {name:"安心保証 ↗",href:"https://aeonmobile.jp/option/"},
      {name:"持ちこみ保証 ↗",href:"https://aeonmobile.jp/plan/device-warranty/"}
    ]
  });

  // NifMo: normalize malformed website tax rendering to the amounts stated in the current terms.
  patch("NifMo MVNO",{
    monthly:"現行：550円/月（税込）",
    cost:"現行：交換1回目 S 33,000円 / A 16,500円 / B 5,500円、2回目 S 38,500円 / A 22,000円 / B 11,000円（すべて税込）",
    note:"現行for SIMフリーは盗難・紛失対象外。料金は最新利用規約の税込額を採用（公式Web本文には税込欄の表示欠落あり）。"
  });

  // Sakura Small Amount & Short Term Insurance: loss/left-behind is explicitly excluded in the FAQ.
  patch("さくら少額短期保険 保険会社",{
    theft:"盗難：○ / 紛失・置き忘れ：×",
    note:"キャリア回線とは独立した保険。機種変更やキャリア乗換後も登録端末を変更して継続可能。主端末は責任開始後すぐ補償、副端末を初めて追加登録する場合は登録日から30日間免責。"
  });

  // Basic data-integrity guard: remove accidental duplicate brands while preserving first occurrence.
  const seen=new Set();
  window.WARRANTY_DATA=rows.filter(x=>{
    if(!x||!x.brand||seen.has(x.brand)) return false;
    seen.add(x.brand);
    return true;
  });
})();
