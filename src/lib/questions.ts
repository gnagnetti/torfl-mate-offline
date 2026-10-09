import type { Category, Level, Question } from "./types";

type Q = Omit<Question, "id" | "level" | "category">;
const bank: Record<Level, Record<Category, Q[]>> = {
  A1: {
    grammar: [
      { prompt: "Это мой ___ .", options: ["брат", "сестра́", "окно́", "кни́га"], answer: 0, explanation: "«Мой» è maschile: si accorda con «брат»." },
      { prompt: "Я живу́ в ___ .", options: ["Москва́", "Москву́", "Москве́", "Москво́й"], answer: 2, explanation: "Prepositivo dopo «в» per luogo: в Москве́." },
      { prompt: "У меня́ есть ___ .", options: ["маши́ну", "маши́на", "маши́ны", "маши́не"], answer: 1, explanation: "Dopo «у меня есть» il possesso è al nominativo." },
      { prompt: "Мы ___ по-ру́сски.", options: ["говорю́", "говори́т", "говори́м", "говоря́т"], answer: 2, explanation: "Coniugazione II, 1ª plurale: говори́м." },
    ],
    lexicon: [
      { prompt: "Утром я пью ___ .", options: ["хлеб", "ко́фе", "суп", "стол"], answer: 1, explanation: "Si beve il caffè: ко́фе (indeclinabile, maschile)." },
      { prompt: "Antonimo di «большо́й»:", options: ["высо́кий", "ма́ленький", "краси́вый", "но́вый"], answer: 1, explanation: "Grande ↔ piccolo." },
      { prompt: "Где мо́жно купи́ть хлеб?", options: ["в апте́ке", "в магази́не", "в шко́ле", "в теа́тре"], answer: 1, explanation: "Il pane si compra in negozio." },
    ],
    reading: [
      { passage: "Меня́ зову́т А́нна. Я студе́нтка. Я учу́сь в университе́те и изуча́ю ру́сский язы́к. Мой брат — врач.", prompt: "Кто А́нна?", options: ["врач", "студе́нтка", "учи́тельница", "инжене́р"], answer: 1, explanation: "«Я студе́нтка»." },
      { passage: "Меня́ зову́т А́нна. Я студе́нтка. Я учу́сь в университе́те и изуча́ю ру́сский язы́к. Мой брат — врач.", prompt: "Что изуча́ет А́нна?", options: ["медици́ну", "англи́йский", "ру́сский язы́к", "исто́рию"], answer: 2, explanation: "«Изуча́ю ру́сский язы́к»." },
    ],
  },
  A2: {
    grammar: [
      { prompt: "Я давно́ не ви́дел ___ .", options: ["свою́ сестру́", "своя́ сестра́", "свое́й сестре́", "свое́й сестры́"], answer: 0, explanation: "Accusativo animato femminile: свою́ сестру́." },
      { prompt: "Вчера́ мы ___ в кино́.", options: ["идём", "ходи́ли", "пойдём", "хо́дим"], answer: 1, explanation: "Andata e ritorno nel passato: ходи́ли." },
      { prompt: "Я позвоню́ ___ за́втра.", options: ["тебя́", "тебе́", "тобо́й", "ты"], answer: 1, explanation: "«Звони́ть» regge il dativo." },
      { prompt: "В кла́ссе пять ___ .", options: ["студе́нт", "студе́нта", "студе́нтов", "студе́нты"], answer: 2, explanation: "Dopo 5+ genitivo plurale." },
    ],
    lexicon: [
      { prompt: "Он ___ на врача́ уже́ два го́да.", options: ["у́чится", "изуча́ет", "у́чит", "занима́ется"], answer: 0, explanation: "«Учи́ться на + acc.» = studiare per diventare." },
      { prompt: "Мне ну́жно ___ биле́т на по́езд.", options: ["взять в долг", "заказа́ть", "сказа́ть", "посмотре́ть"], answer: 1, explanation: "Заказа́ть биле́т = prenotare un biglietto." },
      { prompt: "Сего́дня хо́лодно, на́до наде́ть ___ .", options: ["шо́рты", "ку́ртку", "сарафа́н", "очки́"], answer: 1, explanation: "Fa freddo: giacca." },
    ],
    reading: [
      { passage: "В суббо́ту И́горь е́здил на да́чу к роди́телям. Там он помога́л отцу́ ремонти́ровать крышу, а ве́чером они́ вме́сте ловили ры́бу на о́зере.", prompt: "Что де́лал И́горь ве́чером?", options: ["ремонти́ровал кры́шу", "лови́л ры́бу", "отдыха́л до́ма", "е́хал в го́род"], answer: 1, explanation: "«Ве́чером они́ … лови́ли ры́бу»." },
      { passage: "В суббо́ту И́горь е́здил на да́чу к роди́телям. Там он помога́л отцу́ ремонти́ровать крышу, а ве́чером они́ вме́сте ловили ры́бу на о́зере.", prompt: "Кому́ помога́л И́горь?", options: ["ма́ме", "дру́гу", "отцу́", "сосе́ду"], answer: 2, explanation: "«Помога́л отцу́»." },
    ],
  },
  B1: {
    grammar: [
      { prompt: "Е́сли бы у меня́ бы́ло вре́мя, я ___ с ва́ми.", options: ["пое́ду", "пое́хал бы", "е́ду", "е́здил"], answer: 1, explanation: "Periodo ipotetico irreale: congiuntivo con «бы»." },
      { prompt: "Студе́нт, ___ я вчера́ познако́мился, из Ита́лии.", options: ["кото́рый", "кото́рого", "с кото́рым", "кото́рому"], answer: 2, explanation: "«Познако́миться с + strum.»: с кото́рым." },
      { prompt: "Он вошёл в ко́мнату, ___ дверь.", options: ["закрыва́я", "закры́в", "закры́л", "закрыва́ть"], answer: 1, explanation: "Gerundio perfettivo per azione precedente: закры́в." },
      { prompt: "Ма́ма попроси́ла, ___ я купи́л молоко́.", options: ["что", "что́бы", "е́сли", "потому́ что"], answer: 1, explanation: "Richiesta → «что́бы» + passato." },
    ],
    lexicon: [
      { prompt: "Э́тот фильм произвёл на меня́ си́льное ___ .", options: ["впечатле́ние", "выраже́ние", "отноше́ние", "представле́ние"], answer: 0, explanation: "Произвести́ впечатле́ние = fare impressione." },
      { prompt: "Он ___ уча́стие в конфере́нции.", options: ["взял", "при́нял", "сде́лал", "дал"], answer: 1, explanation: "Collocazione fissa: приня́ть уча́стие." },
      { prompt: "Мы ___ все вопро́сы на собра́нии.", options: ["обсуди́ли", "осуди́ли", "рассуди́ли", "присуди́ли"], answer: 0, explanation: "Обсуди́ть = discutere; осуди́ть = condannare." },
    ],
    reading: [
      { passage: "Всё бо́льше молоды́х люде́й выбира́ют удалённую рабо́ту. По да́нным опро́са, гла́вная причи́на — возмо́жность самостоя́тельно планировать день. Одна́ко мно́гие признаю́тся, что им не хвата́ет живо́го обще́ния с колле́гами.", prompt: "Гла́вная причи́на вы́бора удалённой рабо́ты:", options: ["высо́кая зарпла́та", "свобо́да в плани́ровании вре́мени", "обще́ние с колле́гами", "приказ руково́дства"], answer: 1, explanation: "«Возмо́жность самостоя́тельно плани́ровать день»." },
      { passage: "Всё бо́льше молоды́х люде́й выбира́ют удалённую рабо́ту. По да́нным опро́са, гла́вная причи́на — возмо́жность самостоя́тельно планировать день. Одна́ко мно́гие признаю́тся, что им не хвата́ет живо́го обще́ния с колле́гами.", prompt: "Како́й недоста́ток упомина́ется?", options: ["ма́ло де́нег", "нехва́тка обще́ния", "плохо́й интерне́т", "мно́го рабо́ты"], answer: 1, explanation: "«Не хвата́ет живо́го обще́ния»." },
    ],
  },
  B2: {
    grammar: [
      { prompt: "___ на тру́дности, экспеди́ция дости́гла верши́ны.", options: ["Несмотря́", "Благодаря́", "Всле́дствие", "Ввиду́"], answer: 0, explanation: "Concessiva: несмотря́ на = nonostante." },
      { prompt: "Докла́д, ___ профе́ссором, вы́звал диску́ссию.", options: ["прочита́вший", "прочи́танный", "чита́ющий", "чита́я"], answer: 1, explanation: "Participio passivo passato: прочи́танный кем." },
      { prompt: "Ему́ не ___ поня́ть э́ту тео́рию.", options: ["удало́сь", "удался́", "уда́лся", "удава́лась"], answer: 0, explanation: "Costruzione impersonale: ему́ не удало́сь." },
    ],
    lexicon: [
      { prompt: "Компа́ния ___ убы́тки из-за кри́зиса.", options: ["понесла́", "принесла́", "вынесла", "занесла́"], answer: 0, explanation: "Понести́ убы́тки = subire perdite." },
      { prompt: "Его́ предложе́ние не ___ подде́ржки.", options: ["нашло́", "вошло́", "пришло́", "ушло́"], answer: 0, explanation: "Найти́ подде́ржку = trovare sostegno." },
      { prompt: "Sinonimo di «незаме́нимый»:", options: ["бесполе́зный", "необходи́мый", "случа́йный", "второстепе́нный"], answer: 1, explanation: "Insostituibile ≈ indispensabile." },
    ],
    reading: [
      { passage: "Исто́рики подчёркивают, что рефо́рмы Петра́ I бы́ли противоречи́выми: с одно́й стороны́, они́ модернизи́ровали госуда́рство, с друго́й — ложи́лись тяжёлым бре́менем на крестья́нство.", prompt: "Как а́втор оце́нивает рефо́рмы?", options: ["то́лько положи́тельно", "то́лько отрица́тельно", "неоднозна́чно", "не оце́нивает"], answer: 2, explanation: "«Противоречи́выми» — valutazione ambivalente." },
    ],
  },
  C1: {
    grammar: [
      { prompt: "___ бы он ни говори́л, ему́ никто́ не ве́рил.", options: ["Что", "Как", "Чем", "Кто"], answer: 0, explanation: "Concessiva generalizzante: что бы ни." },
      { prompt: "По ___ сро́ка догово́р счита́ется расто́ргнутым.", options: ["истече́нию", "истече́нии", "истече́ние", "истече́нием"], answer: 1, explanation: "«По + prepositivo» = dopo: по истече́нии сро́ка." },
      { prompt: "Он говори́л так убеди́тельно, ___ все согласи́лись.", options: ["что́бы", "что", "как бу́дто", "е́сли"], answer: 1, explanation: "Consecutiva reale: так…, что." },
    ],
    lexicon: [
      { prompt: "Его́ слова́ ___ в коне́ц всем спо́рам.", options: ["поста́вили то́чку", "положи́ли коне́ц", "сде́лали коне́ц", "да́ли то́чку"], answer: 1, explanation: "Положи́ть коне́ц чему́-либо." },
      { prompt: "«Води́ть за нос» significa:", options: ["guidare", "ingannare", "aiutare", "rimproverare"], answer: 1, explanation: "Idioma: prendere in giro, ingannare." },
      { prompt: "Пробле́ма тре́бует ___ подхо́да.", options: ["взвешенного", "ве́шающего", "наве́шанного", "све́шенного"], answer: 0, explanation: "Взве́шенный подхо́д = approccio ponderato." },
    ],
    reading: [
      { passage: "Язы́к — не просто́й инструме́нт коммуника́ции, но и храни́тель коллекти́вной па́мяти наро́да. Утра́та языка́ влечёт за собо́й невосполни́мую поте́рю культу́рного насле́дия.", prompt: "Основна́я мысль те́кста:", options: ["язы́к ну́жен то́лько для обще́ния", "язы́к хра́нит культу́рную па́мять", "языки́ легко́ восстана́вливаются", "па́мять не свя́зана с языко́м"], answer: 1, explanation: "«Храни́тель коллекти́вной па́мяти»." },
    ],
  },
};

export const QUESTIONS: Question[] = Object.entries(bank).flatMap(([level, cats]) =>
  Object.entries(cats).flatMap(([category, list]) =>
    list.map((q, i) => ({ ...q, id: `${level}-${category}-${i}`, level: level as Level, category: category as Category })),
  ),
);

export function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = r[i]!; r[i] = r[j]!; r[j] = t; }
  return r;
}
