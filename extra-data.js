window.WARRANTY_DATA=window.WARRANTY_DATA||[];

// Independent mobile-device insurance: Sakura Small Amount & Short Term Insurance.
window.WARRANTY_DATA.push({
  type:"保険会社",
  status:"受付中",
  byod:"yes",
  brand:"さくら少額短期保険 保険会社",
  reception:"受付中",
  service:"モバイル保険",
  monthly:"700円/月（非課税）",
  cost:"修理可能：補償上限内は自己負担金なし。年間通算最大10万円。主端末は最大10万円、副端末2台は合計最大3万円。修理不能・盗難：主端末最大25,000円、副端末は1台最大7,500円。",
  coverage:"外装破損・損壊・水濡れ・故障・盗難。スマホだけでなく、日本国内で販売されたメーカー純正のWi-Fi/Bluetooth対応端末も対象になり得る。",
  bring:"○ キャリア不問。1契約で主端末1台＋副端末2台の最大3台。所定の登録条件あり。",
  theft:"盗難：○ / 紛失・置き忘れ：×",
  join:"登録時に正常動作している国内販売のメーカー純正無線通信端末。原則、新規取得から1年未満、または1年以上でもメーカー/通信キャリアの有償補償サービスに加入して補償を受けられる状態であること。家族・知人・オークション等から購入・譲渡された端末は登録不可。",
  note:"キャリア回線とは独立した保険。機種変更やキャリア乗換後も登録端末を変更して継続可能。主端末は免責期間なし、副端末を初めて追加登録する場合は30日間の免責期間あり。",
  links:[
    {name:"モバイル保険 公式 ↗",href:"https://mobile-hoken.com/service.html"},
    {name:"さくら少額短期保険 ↗",href:"https://www.sakura-ssi.co.jp/"}
  ]
});

// Independent mobile-device insurance: J:COM Small Amount & Short Term Insurance.
window.WARRANTY_DATA.push({
  type:"保険会社",
  status:"受付中",
  byod:"yes",
  brand:"ジェイコム少額短期保険 保険会社",
  reception:"受付中",
  service:"家族のスマホ保険",
  monthly:"2台680円/月、3台880円/月、以降1台追加につき200円/月（最大10台・保険料は非課税）",
  cost:"免責金額0円。2台プランは修理費用最大10万円、修理不能・盗難の再取得費用最大5万円（1台2.5万円上限）、両者合計10万円まで。補償台数が増えると上限も増額。",
  coverage:"故障・破損・水濡れの修理費用、修理不能・盗難時の再取得費用。",
  bring:"○ キャリア不問。他社購入・中古スマホも、発売5年以内など所定条件を満たせば対象。最低2台〜最大10台。",
  theft:"盗難：○ / 紛失：×（公式の保険金支払事由に含まれない）",
  join:"対象機器の事前登録が必要。発売5年以内、日本国内販売のメーカー純正品、技適表示、申込時に全機能が正常かつ外装破損なし等の条件。保険契約者は成人した個人で、被保険者は本人・2親等内の親族等。",
  note:"J:COM MOBILEの端末保証とは別の保険商品。引受会社はジェイコム少額短期保険株式会社、取扱代理店はJ:COMグループ各社。毎月20日までの申込で、原則翌月1日から補償開始。",
  links:[
    {name:"家族のスマホ保険 ↗",href:"https://www.jcom.co.jp/service/ssi/kazoku_sumaho/"},
    {name:"補償内容 ↗",href:"https://www.jcom.co.jp/service/ssi/kazoku_sumaho/detail/"}
  ]
});

// 2026-08-08 factual audit corrections and precision patches.
(function(){
  const rows=window.WARRANTY_DATA||[];
  const patch=(brand,changes)=>{
    const item=rows.find(x=>x.brand===brand);
    if(item) Object.assign(item,changes);
  };

  patch("povo 2.0 オンライン/サブ",{
    cost:"交換時負担：Android 11,000円/回、iPhone 22,000円/回。",
    note:"新規申込は2023年7月31日で終了。既加入者のみ利用可能。盗難・紛失は対象外。"
  });

  patch("楽天モバイル MNO",{
    service:"購入Android・モバイルルーター／Rakuten認定中古iPhone：スマホ交換保証プラス & 家電補償 / 新品iPhone：故障紛失保証 with AppleCare Services & iCloud+ / 持込：持ち込みスマホあんしん保証",
    monthly:"購入Android等：980 / 1,180 / 1,380 / 1,580円/月（製品価格別） / Rakuten認定中古iPhone：1,310 / 1,490 / 1,650円/月 / 持込：715〜1,309円/月 / 新品iPhone：1,310 / 1,490 / 1,650円/月（機種別）",
    cost:"スマホ交換保証プラス & 家電補償：6,600円または12,900円 / 持込：6,600円または12,100円 / 新品iPhone：AppleCare系の事故種別・機種条件による",
    coverage:"購入Android・モバイルルーター／Rakuten認定中古iPhone：故障・破損・水濡れ・盗難・紛失 / 持込：破損・全損・水没等 / 新品iPhone：AppleCare系の補償内容に準拠",
    theft:"スマホ交換保証プラス & 家電補償：○（盗難・紛失） / 持込：× / 新品iPhone：故障紛失保証の条件に準拠",
    note:"2026年6月17日からRakuten認定中古iPhoneもスマホ交換保証プラス & 家電補償の対象。交換保証は年3回まで、うち盗難・紛失は年2回まで。認定中古は購入時のみ加入可能。"
  });

  patch("BIGLOBE mobile MVNO",{
    join:"BIGLOBEモバイルのSIMまたは一部サービスとの同時申込時に受付。本サービス単独での申込は不可。保証開始は原則申込月（回線同時申込時は回線開始月）の翌月1日。解約後の再申込不可。",
    note:"対象端末は申請日から過去90日以内にBIGLOBEモバイルSIMで通信実績が必要。故障・破損発生日から10日を超えた申出は受付不可。"
  });

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

  // Keep J:COM MOBILE carrier warranty separate from J:COM's independent insurance product.
  patch("J:COM MOBILE MVNO",{
    byod:"no",
    service:"購入Android：安心端末保証60 / 新品iPhone：AppleCare+等 / 旧au Certified iPhone：端末保証 for iPhone（新規受付終了）",
    monthly:"安心端末保証60：660円/月（Google Pixel 8aは880円） / 新品iPhone：AppleCare+等の機種別料金 / 旧au Certified iPhone端末保証：既加入者向け",
    cost:"安心端末保証60：通常Android 1回目0円・2回目5,500円・3回目以降21,780円、Pixel 8aは5,500円・11,000円・21,780円 / 旧au Certified iPhone端末保証：11,000円・16,500円・21,780円",
    coverage:"購入端末向けの故障・破損・水濡れ等。iPhoneは加入するAppleCare系サービスの条件による。",
    bring:"× J:COM MOBILEの購入端末向け保証。キャリア不問の「家族のスマホ保険」は保険会社カテゴリに別掲載。",
    theft:"安心端末保証60：盗難補償としては扱わない / iPhone：加入するAppleCare系サービスの条件による",
    join:"安心端末保証60はJ:COM MOBILE対象端末の購入と同時加入。旧au Certified iPhone向け端末保証は新規受付終了。",
    note:"Google Pixel 8aは安心端末保証60の月額・交換負担金が通常Androidと異なる。旧au Certified iPhone向け「端末保証 for iPhone」は新規受付終了。",
    links:[
      {name:"安心端末保証60 ↗",href:"https://www.jcom.co.jp/service/mobile/option/guaranty60/"},
      {name:"旧iPhone端末保証 ↗",href:"https://www.jcom.co.jp/service/mobile/option/guaranty/iphone/"}
    ]
  });

  patch("NifMo MVNO",{
    monthly:"現行：550円/月（税込）",
    cost:"現行：交換1回目 S 33,000円 / A 16,500円 / B 5,500円、2回目 S 38,500円 / A 22,000円 / B 11,000円（すべて税込）",
    note:"現行for SIMフリーは盗難・紛失対象外。料金は2026年4月10日改定の現行利用規約の税込額を採用（公式Web本文の税込欄は表示崩れあり）。"
  });

  // Remove accidental duplicate entries while preserving source order.
  const seen=new Set();
  window.WARRANTY_DATA=rows.filter(x=>{
    if(!x||!x.brand||seen.has(x.brand)) return false;
    seen.add(x.brand);
    return true;
  });
})();
