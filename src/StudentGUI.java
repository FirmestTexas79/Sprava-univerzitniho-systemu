import javax.management.relation.Role;
import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.sql.*;

public class StudentGUI extends JFrame {
    private enum Role { ADMIN, HOST }

    private JPanel panel;
    private JTable table;
    private JPanel currentPanel;
    private Role userRole;
    private JToolBar toolBar;

    public StudentGUI() {
        setTitle("Správa Studentů");
        setSize(600, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        table = new JTable();

        panel = new JPanel();
        panel.setLayout(new BorderLayout());

        toolBar = new JToolBar();
        toolBar.setFloatable(false);

        chooseUserRole();

        setupUI();
    }

    private void chooseUserRole() {
        Object[] options = {"Admin", "Host"};
        int selection = JOptionPane.showOptionDialog(null, "Vyberte roli", "Vyberte roli", JOptionPane.DEFAULT_OPTION, JOptionPane.QUESTION_MESSAGE, null, options, options[0]);

        if (selection == 0) {
            userRole = Role.ADMIN;
        } else if (selection == 1) {
            userRole = Role.HOST;
        } else {
            System.exit(0);
        }
    }

    private void setupUI() {
        if (userRole == Role.ADMIN) {
            setupAdminUI();
        } else if (userRole == Role.HOST) {
            setupHostUI();
        }
    }

    private void setupAdminUI() {
        if (prihlasitAdmina()) {
            JButton studentButton = new JButton("Student");
            studentButton.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    zobrazOknoStudent();
                }
            });
            toolBar.add(studentButton);

            JButton predmetButton = new JButton("Předmět");
            predmetButton.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    zobrazOknoPredmet();
                }
            });
            toolBar.add(predmetButton);

            JButton hodnoceniButton = new JButton("Hodnocení");
            hodnoceniButton.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    zobrazOknoHodnoceni();
                }
            });
            toolBar.add(hodnoceniButton);

            panel.add(toolBar, BorderLayout.NORTH);
            currentPanel = panel;

            add(panel);
        } else {
            System.exit(0);
        }
    }

    private void setupHostUI() {
        String idStudentStr = JOptionPane.showInputDialog(null, "Zadejte ID studenta:", "Přihlášení Hosta", JOptionPane.PLAIN_MESSAGE);
        if (idStudentStr != null && !idStudentStr.isEmpty()) {
            int idStudent = Integer.parseInt(idStudentStr);
            zobrazitStudenty();
        } else {
            JOptionPane.showMessageDialog(null, "Neplatný vstup.", "Chyba", JOptionPane.ERROR_MESSAGE);
            System.exit(0);
        }
    }

    private boolean prihlasitAdmina() {
        JTextField usernameField = new JTextField();
        JPasswordField passwordField = new JPasswordField();
        Object[] message = {
                "Jméno:", usernameField,
                "Heslo:", passwordField
        };

        int option = JOptionPane.showConfirmDialog(null, message, "Přihlášení Admina", JOptionPane.OK_CANCEL_OPTION);
        if (option == JOptionPane.OK_OPTION) {
            String username = usernameField.getText();
            String password = new String(passwordField.getPassword());
            if (username.equals("admin") && password.equals("heslo")) {
                return true;
            } else {
                JOptionPane.showMessageDialog(null, "Neplatné jméno nebo heslo", "Chyba", JOptionPane.ERROR_MESSAGE);
                return false;
            }
        } else {
            return false;
        }
    }
    private void zobrazOknoStudent() {
        JButton zobrazitStudentyButton = new JButton("Zobrazit studenty");
        zobrazitStudentyButton.addActionListener(e -> zobrazitStudenty());

        JButton pridejStudentaButton = new JButton("Přidat studenta");
        pridejStudentaButton.addActionListener(e -> pridejStudenta());

        JButton odeberStudentaButton = new JButton("Odebrat studenta");
        odeberStudentaButton.addActionListener(e -> {
            String idStudentStr = JOptionPane.showInputDialog(null, "Zadejte ID studenta k odebrání:", "Odebrat studenta", JOptionPane.PLAIN_MESSAGE);
            if (idStudentStr != null && !idStudentStr.isEmpty()) {
                int idStudent = Integer.parseInt(idStudentStr);
                odeberStudenta(idStudent);
            } else {
                JOptionPane.showMessageDialog(null, "Neplatný vstup.", "Chyba", JOptionPane.ERROR_MESSAGE);
            }
        });

        JPanel studentPanel = new JPanel();
        studentPanel.add(zobrazitStudentyButton);
        studentPanel.add(pridejStudentaButton);
        studentPanel.add(odeberStudentaButton);

        zobrazOkno(studentPanel);
    }



    private void zobrazOknoPredmet() {
        JButton zobrazitPredmetyButton = new JButton("Zobrazit předměty");
        zobrazitPredmetyButton.addActionListener(e -> zobrazitPredmety());

        JButton pridejPredmetButton = new JButton("Přidej předmět");
        pridejPredmetButton.addActionListener(e -> pridejPredmet());

        JButton zrusitPredmetButton = new JButton("Zrušit předmět");
        zrusitPredmetButton.addActionListener(e -> {
            String idPredmetStr = JOptionPane.showInputDialog(null, "Zadejte ID předmětu k zrušení:", "Zrušit předmět", JOptionPane.PLAIN_MESSAGE);
            if (idPredmetStr != null && !idPredmetStr.isEmpty()) {
                int idPredmet = Integer.parseInt(idPredmetStr);
                zrusitPredmet(idPredmet);
            } else {
                JOptionPane.showMessageDialog(null, "Neplatný vstup.", "Chyba", JOptionPane.ERROR_MESSAGE);
            }
        });

        JPanel predmetPanel = new JPanel();
        predmetPanel.add(zobrazitPredmetyButton);
        predmetPanel.add(pridejPredmetButton);
        predmetPanel.add(zrusitPredmetButton);

        zobrazOkno(predmetPanel);
    }


    private void zobrazOknoHodnoceni() {
        JButton zobrazitHodnoceniButton = new JButton("Zobrazit hodnocení");
        zobrazitHodnoceniButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                zobrazitHodnoceni();
            }
        });
        JButton pridejHodnoceniButton = new JButton("Přidat hodnocení");
        pridejHodnoceniButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                pridejHodnoceni();
            }
        });
        JPanel hodnoceniPanel = new JPanel();
        hodnoceniPanel.add(zobrazitHodnoceniButton);
        hodnoceniPanel.add(pridejHodnoceniButton);
        zobrazOkno(hodnoceniPanel);
    }

    private void zobrazOkno(JPanel newPanel) {
        panel.remove(currentPanel);
        panel.add(newPanel, BorderLayout.CENTER);
        currentPanel = newPanel;
        panel.revalidate();
        panel.repaint();
    }


    private void pridejPredmet() {
        JTextField nazevField = new JTextField();
        JTextField idKategorieField = new JTextField();
        JTextField kodField = new JTextField();

        Object[] message = {
                "Název:", nazevField,
                "ID kategorie:", idKategorieField,
                "Kód:", kodField
        };

        int option = JOptionPane.showConfirmDialog(null, message, "Přidat předmět", JOptionPane.OK_CANCEL_OPTION);
        if (option == JOptionPane.OK_OPTION) {
            String nazev = nazevField.getText();
            int id_kategorie = Integer.parseInt(idKategorieField.getText());
            String kod = kodField.getText();

            Connection connection = null;
            PreparedStatement preparedStatement = null;

            try {
                connection = DriverManager.getConnection(
                        "jdbc:mysql://127.0.0.1:3306/sprava_univerzitniho_systemu",
                        "root",
                        "heslo");

                connection.setAutoCommit(false);

                String insertQuery = "INSERT INTO Predmet (nazev, idkategorie, kod) VALUES (?, ?, ?)";
                preparedStatement = connection.prepareStatement(insertQuery);
                preparedStatement.setString(1, nazev);
                preparedStatement.setInt(2, id_kategorie);
                preparedStatement.setString(3, kod);

                preparedStatement.executeUpdate();

                connection.commit();

                JOptionPane.showMessageDialog(null, "Předmět byl úspěšně přidán.", "Úspěch", JOptionPane.INFORMATION_MESSAGE);
            } catch (SQLException ex) {
                try {
                    if (connection != null) {
                        connection.rollback();
                    }
                } catch (SQLException rollbackEx) {
                    rollbackEx.printStackTrace();
                }
                ex.printStackTrace();
                JOptionPane.showMessageDialog(null, "Chyba při přidávání předmětu: " + ex.getMessage(), "Chyba", JOptionPane.ERROR_MESSAGE);
            } finally {
                try {
                    if (preparedStatement != null) {
                        preparedStatement.close();
                    }
                    if (connection != null) {
                        connection.setAutoCommit(true);
                        connection.close();
                    }
                } catch (SQLException closeEx) {
                    closeEx.printStackTrace();
                }
            }
        }
    }
    private void zobrazitPredmety() {
        zobrazTabulku("PREDMET", "SELECT Predmet.idpredmet, Predmet.nazev AS nazev_predmetu, Kategorie.nazev AS kategorie FROM Predmet INNER JOIN Kategorie ON Predmet.idkategorie = Kategorie.idkategorie ORDER BY Predmet.idpredmet", "Zobrazit předměty");
    }

    private void zobrazitStudenty() {
        zobrazTabulku("STUDENT", "SELECT * FROM STUDENT", "Zobrazit studenty");

        // Přidání posluchače událostí pro kliknutí na buňku s ID studenta
        table.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                int row = table.rowAtPoint(e.getPoint());
                int column = table.columnAtPoint(e.getPoint());
                if (row >= 0 && column >= 0) { // Kontrola, zda je vybraná buňka platná
                    int idStudent = (int) table.getValueAt(row, column); // Získání hodnoty ID studenta
                    zobrazAktivityStudenta(idStudent);
                }
            }
        });
    }


    private void zrusitPredmet(int idPredmet) {
        // Vytvoření dialogového okna pro potvrzení smazání
        String potvrzeni = JOptionPane.showInputDialog(null, "Opravdu chcete smazat tento předmět? Pokud ano, napište 'ano' a potvrďte:", "Potvrzení smazání", JOptionPane.WARNING_MESSAGE);

        // Kontrola uživatelova potvrzení
        if (potvrzeni != null && potvrzeni.equalsIgnoreCase("ano")) {
            try {
                Connection connection = DriverManager.getConnection(
                        "jdbc:mysql://127.0.0.1:3306/sprava_univerzitniho_systemu",
                        "root",
                        "heslo");

                // Smazání předmětu
                String querySmazatPredmet = "DELETE FROM Predmet WHERE idpredmet = ?";
                PreparedStatement preparedStatementSmazatPredmet = connection.prepareStatement(querySmazatPredmet);
                preparedStatementSmazatPredmet.setInt(1, idPredmet);
                preparedStatementSmazatPredmet.executeUpdate();

                JOptionPane.showMessageDialog(null, "Předmět byl úspěšně smazán.", "Úspěch", JOptionPane.INFORMATION_MESSAGE);

                connection.close();
            } catch (SQLException ex) {
                ex.printStackTrace();
                JOptionPane.showMessageDialog(null, "Chyba při mazání předmětu: " + ex.getMessage(), "Chyba", JOptionPane.ERROR_MESSAGE);
            }
        } else {
            JOptionPane.showMessageDialog(null, "Operace byla zrušena uživatelem.", "Zrušeno", JOptionPane.INFORMATION_MESSAGE);
        }
    }


    private void zobrazAktivityStudenta(int idStudent) {
        try {
            Connection connection = DriverManager.getConnection(
                    "jdbc:mysql://127.0.0.1:3306/sprava_univerzitniho_systemu",
                    "root",
                    "heslo");

            String queryAktivity = "SELECT nazev FROM aktivity WHERE idaktivity IN " +
                    "(SELECT idaktivity FROM student_aktivity WHERE idstudent = ?)";
            PreparedStatement preparedStatementAktivity = connection.prepareStatement(queryAktivity);
            preparedStatementAktivity.setInt(1, idStudent);
            ResultSet resultSetAktivity = preparedStatementAktivity.executeQuery();

            StringBuilder sbAktivity = new StringBuilder();
            sbAktivity.append("Aktivity studenta (ID ").append(idStudent).append("):\n");
            while (resultSetAktivity.next()) {
                sbAktivity.append(resultSetAktivity.getString("nazev")).append("\n");
            }

            String queryPrumer = "SELECT prumer AS Prumer FROM prumerhodnoceni WHERE idstudent = ?";
            PreparedStatement preparedStatementPrumer = connection.prepareStatement(queryPrumer);
            preparedStatementPrumer.setInt(1, idStudent);
            ResultSet resultSetPrumer = preparedStatementPrumer.executeQuery();

            double prumer = 0;
            if (resultSetPrumer.next()) {
                prumer = resultSetPrumer.getDouble("prumer");
            }

            JOptionPane.showMessageDialog(null, sbAktivity.toString() + "\nPrůměrné hodnocení: " + prumer, "Aktivity a průměrné hodnocení", JOptionPane.INFORMATION_MESSAGE);

            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(null, "Chyba při získávání aktivit a průměrného hodnocení studenta: " + e.getMessage(), "Chyba", JOptionPane.ERROR_MESSAGE);
        }
    }


    private void zobrazTabulku(String nazevTabulky, String sqlQuery, String nazevTlacitka) {
        try {
            Connection connection = DriverManager.getConnection(
                    "jdbc:mysql://127.0.0.1:3306/sprava_univerzitniho_systemu",
                    "root",
                    "heslo");

            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(sqlQuery);

            JPanel dataPanel = new JPanel();
            dataPanel.setLayout(new BorderLayout());

            // Vytvoření panelu pro zobrazení tabulky
            JPanel tablePanel = new JPanel(new BorderLayout());
            DefaultTableModel tableModel = new DefaultTableModel();
            table = new JTable(tableModel); // Použití globální proměnné table
            JScrollPane scrollPane = new JScrollPane(table);
            tablePanel.add(scrollPane, BorderLayout.CENTER);

            ResultSetMetaData metaData = resultSet.getMetaData();
            int columnCount = metaData.getColumnCount();

            String[] columns = new String[columnCount];
            for (int i = 1; i <= columnCount; i++) {
                columns[i - 1] = metaData.getColumnName(i);
            }
            tableModel.setColumnIdentifiers(columns);

            while (resultSet.next()) {
                Object[] rowData = new Object[columnCount];
                for (int i = 1; i <= columnCount; i++) {
                    rowData[i - 1] = resultSet.getObject(i);
                }
                tableModel.addRow(rowData);
            }

            // Vytvoření tlačítka pro zobrazení specifických dat
            JButton zobrazitDataButton = new JButton(nazevTlacitka);
            zobrazitDataButton.addActionListener(e -> zobrazTabulku(nazevTabulky, sqlQuery, nazevTlacitka));

            // Přidání tabulky a tlačítka do hlavního panelu pro zobrazení dat
            dataPanel.add(tablePanel, BorderLayout.CENTER);
            dataPanel.add(zobrazitDataButton, BorderLayout.SOUTH);

            // Přidání hlavního panelu na hlavní panel aplikace
            try {
                panel.remove(currentPanel);
            } catch (NullPointerException ex) {
                ex.printStackTrace(); // Výpis stopy na standardní výstup
            }
            panel.add(dataPanel, BorderLayout.CENTER);
            currentPanel = dataPanel;
            panel.revalidate();
            panel.repaint();

            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    // Metoda pro zobrazení hodnocení
    private void zobrazitHodnoceni() {
        zobrazTabulku("HODNOCENI", "SELECT idstudent, idzkouska, hodnoceni FROM Hodnoceni", "Zobrazit hodnocení");
    }


    private void pridejHodnoceni() {
        try {
            Connection connection = DriverManager.getConnection(
                    "jdbc:mysql://127.0.0.1:3306/sprava_univerzitniho_systemu",
                    "root",
                    "heslo");

            int id_student = Integer.parseInt(JOptionPane.showInputDialog("Zadejte ID studenta:"));
            int id_zkouska = Integer.parseInt(JOptionPane.showInputDialog("Zadejte ID zkoušky:"));
            int hodnoceni = Integer.parseInt(JOptionPane.showInputDialog("Zadejte hodnocení (1-5):"));

            String query = "INSERT INTO Hodnoceni (idstudent, idzkouska, hodnoceni) VALUES (?, ?, ?)";
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1, id_student);
            preparedStatement.setInt(2, id_zkouska);
            preparedStatement.setInt(3, hodnoceni);

            int rowsInserted = preparedStatement.executeUpdate();
            if (rowsInserted > 0) {
                JOptionPane.showMessageDialog(null, "Hodnocení bylo úspěšně přidáno.", "Úspěch", JOptionPane.INFORMATION_MESSAGE);
            }

            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(null, "Chyba při přidávání hodnocení: " + e.getMessage(), "Chyba", JOptionPane.ERROR_MESSAGE);
        }
    }


    private void pridejStudenta() {
        JTextField jmenoField = new JTextField();
        JTextField prijmeniField = new JTextField();
        JTextField adresaField = new JTextField();
        JTextField kontaktField = new JTextField();
        JTextField datumNarozeniField = new JTextField();

        Object[] message = {
                "Jméno:", jmenoField,
                "Příjmení:", prijmeniField,
                "Adresa:", adresaField,
                "Kontakt:", kontaktField,
                "Datum narození:", datumNarozeniField
        };

        int option = JOptionPane.showConfirmDialog(null, message, "Přidat studenta", JOptionPane.OK_CANCEL_OPTION);
        if (option == JOptionPane.OK_OPTION) {
            String jmeno = jmenoField.getText();
            String prijmeni = prijmeniField.getText();
            String adresa = adresaField.getText();
            String kontakt = kontaktField.getText();
            String datumNarozeni = datumNarozeniField.getText();

            Connection connection = null;
            PreparedStatement preparedStatement = null;

            try {
                connection = DriverManager.getConnection(
                        "jdbc:mysql://127.0.0.1:3306/sprava_univerzitniho_systemu",
                        "root",
                        "heslo");

                connection.setAutoCommit(false);

                String insertQuery = "INSERT INTO Student (jmeno, prijmeni, adresa, kontakt, datumNarozeni) VALUES (?, ?, ?, ?, ?)";
                preparedStatement = connection.prepareStatement(insertQuery);
                preparedStatement.setString(1, jmeno);
                preparedStatement.setString(2, prijmeni);
                preparedStatement.setString(3, adresa);
                preparedStatement.setString(4, kontakt);
                preparedStatement.setString(5, datumNarozeni);

                preparedStatement.executeUpdate();

                connection.commit();

                JOptionPane.showMessageDialog(null, "Student byl úspěšně přidán.", "Úspěch", JOptionPane.INFORMATION_MESSAGE);
            } catch (SQLException ex) {
                try {
                    if (connection != null) {
                        connection.rollback();
                    }
                } catch (SQLException rollbackEx) {
                    rollbackEx.printStackTrace();
                }
                ex.printStackTrace();
                JOptionPane.showMessageDialog(null, "Chyba při přidávání studenta: " + ex.getMessage(), "Chyba", JOptionPane.ERROR_MESSAGE);
            } finally {
                try {
                    if (preparedStatement != null) {
                        preparedStatement.close();
                    }
                    if (connection != null) {
                        connection.setAutoCommit(true);
                        connection.close();
                    }
                } catch (SQLException closeEx) {
                    closeEx.printStackTrace();
                }
            }
        }
    }


    private void odeberStudenta(int idStudent) {
        // Vytvoření dialogového okna pro potvrzení smazání
        String potvrzeni = JOptionPane.showInputDialog(null, "Opravdu chcete smazat tohoto studenta? Pokud ano, napište 'ano' a potvrďte:", "Potvrzení smazání", JOptionPane.WARNING_MESSAGE);

        // Kontrola uživatelova potvrzení
        if (potvrzeni != null && potvrzeni.equalsIgnoreCase("ano")) {
            try {
                Connection connection = DriverManager.getConnection(
                        "jdbc:mysql://127.0.0.1:3306/sprava_univerzitniho_systemu",
                        "root",
                        "heslo");

                String query = "DELETE FROM Student WHERE idstudent = ?";
                PreparedStatement preparedStatement = connection.prepareStatement(query);
                preparedStatement.setInt(1, idStudent);
                preparedStatement.executeUpdate();

                JOptionPane.showMessageDialog(null, "Student byl úspěšně odebrán.", "Úspěch", JOptionPane.INFORMATION_MESSAGE);

                connection.close();
            } catch (SQLException ex) {
                ex.printStackTrace();
                JOptionPane.showMessageDialog(null, "Chyba při odebírání studenta: " + ex.getMessage(), "Chyba", JOptionPane.ERROR_MESSAGE);
            }
        } else {
            JOptionPane.showMessageDialog(null, "Operace byla zrušena uživatelem.", "Zrušeno", JOptionPane.INFORMATION_MESSAGE);
        }
    }


    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                StudentGUI gui = new StudentGUI();
                gui.setVisible(true);
            }
        });
    }
}
