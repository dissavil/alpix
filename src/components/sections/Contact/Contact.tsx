"use client";

import type { FormEvent } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const contact = String(
      formData.get("contact") ?? "",
    ).trim();
    const role = String(formData.get("role") ?? "");
    const message = String(
      formData.get("message") ?? "",
    ).trim();

    const body = [
      "Заявка с сайта ALPIX",
      "",
      `Имя: ${name}`,
      `Контакт: ${contact}`,
      `Роль: ${role}`,
      "",
      "О проекте:",
      message || "Не указано",
    ].join("\n");

    const subject = encodeURIComponent(
      "Заявка с сайта ALPIX",
    );

    window.location.href =
      `mailto:alpix@outlook.com?subject=${subject}` +
      `&body=${encodeURIComponent(body)}`;
  }

  return (
    <section
      id="contacts"
      className={styles.contactSection}
    >
      <div className={styles.container}>
        <div className={styles.contactIntro}>
          <p className={styles.kicker}>
            07 / Контакты
          </p>

          <h2 className={styles.title}>
            Обсудим
            <br />
            ваш проект
          </h2>

          <p className={styles.description}>
            Есть земельный участок, идея девелоперского
            проекта или рассматриваете инвестиции
            в строительство? Оставьте информацию —
            обсудим потенциал и возможные риски.
          </p>

          <a
            className={styles.email}
            href="mailto:alpix@outlook.com"
          >
            alpix@outlook.com
          </a>

          <p className={styles.location}>
            Алматы и Алматинская область
          </p>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.field}>
            <label htmlFor="name">Имя</label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Как к вам обращаться"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="contact">
              Телефон или email
            </label>

            <input
              id="contact"
              name="contact"
              type="text"
              autoComplete="tel"
              placeholder="Как с вами связаться"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="role">
              Кто вы?
            </label>

            <select
              id="role"
              name="role"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Выберите вашу роль
              </option>

              <option value="Инвестор">
                Инвестор
              </option>

              <option value="Владелец земли">
                Владелец земли
              </option>

              <option value="Частный клиент">
                Частный клиент
              </option>

              <option value="Другое">
                Другое
              </option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="message">
              О проекте
            </label>

            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Опишите задачу, участок или идею"
            />
          </div>

          <button
            className={styles.submit}
            type="submit"
          >
            Подготовить заявку
            <span aria-hidden="true">↗</span>
          </button>

          <p className={styles.formNote}>
            После нажатия откроется почтовое приложение
            с заполненным письмом. Отправка через сайт
            пока не настроена.
          </p>
        </form>
      </div>
    </section>
  );
}