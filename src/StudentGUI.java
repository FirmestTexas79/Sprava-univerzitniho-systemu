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
    private JPanel panel;
    private JTable table;
    private JPanel currentPanel;
    private DatabaseManager databaseManager;
    private RoleManager.Role userRole;
    private JToolBar toolBar;
    private JButton studentButton;

    private int idStudent;
    private JButton rozvrhButton;

    public StudentGUI() {
        setTitle("Správa Studentů");
        setSize(600, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        table = new JTable();

        panel = new JPanel();
        panel.setLayout(new BorderLayout());

        databaseManager = new DatabaseManager();
        userRole = RoleManager.chooseUserRole(); // Zde získáme uživatelskou roli

        setupUI();
    }

    private void setupUI() {
        if (userRole == RoleManager.Role.ADMIN) {
            setupAdminUI();
        } else if (userRole == RoleManager.Role.HOST) {
            setupHostUI();
        }
    }


    private void setupAdminUI() {
        if (prihlasitAdmina()) {
            JToolBar toolBar = new JToolBar();
            toolBar.setFloatable(false);

            JButton studentButton = new JButton("Student");
            studentButton.addActionListener(e -> zobrazOknoStudent());
            toolBar.add(studentButton);

            JButton predmetButton = new JButton("Předmět");
            predmetButton.addActionListener(e -> zobrazOknoPredmet());
            toolBar.add(predmetButton);

            JButton hodnoceniButton = new JButton("Hodnocení");
            hodnoceniButton.addActionListener(e -> zobrazOknoHodnoceni());
            toolBar.add(hodnoceniButton);

            panel.add(toolBar, BorderLayout.NORTH);
            currentPanel = panel;

            add(panel);
        } else {
            System.exit(0);
        }
    }


    private void setupHostUI() {
        // Zobrazíme dialogové okno pro zadání ID studenta
        String idStudentStr = JOptionPane.showInputDialog(null, "Zadejte ID studenta:", "Přihlášení Hosta", JOptionPane.PLAIN_MESSAGE);
        if (idStudentStr != null && !idStudentStr.isEmpty()) {
            idStudent = Integer.parseInt(idStudentStr);

            // Vytvoříme tlačítko pro zobrazení rozvrhu studenta
            JButton rozvrhButton = new JButton("Zobrazit rozvrh");
            //rozvrhButton.addActionListener(e -> RozvrhManager.zobrazitRozvrh(idStudent));
            rozvrhButton.addActionListener(e -> ziskej_nazvy_a_prumery_predmetu(idStudent));


            // Vytvoříme tlačítko pro zobrazení informací o studentovi podle ID
            JButton infoStudentButton = new JButton("Informace o mě");
            infoStudentButton.addActionListener(e -> zobrazitStudentaPodleID()); // Předáváme idStudent jako argument

            // Vytvoříme panel pro tlačítka
            JPanel buttonPanel = new JPanel();
            buttonPanel.add(rozvrhButton);
            buttonPanel.add(infoStudentButton);

            // Přidáme tlačítka na horní část panelu
            panel.add(buttonPanel, BorderLayout.NORTH);
            currentPanel = buttonPanel;

            add(panel);
        } else {
            JOptionPane.showMessageDialog(null, "Neplatný vstup.", "Chyba", JOptionPane.ERROR_MESSAGE);
            System.exit(0);
        }
    }


    private void ziskej_nazvy_a_prumery_predmetu(int idStudent) {
        try {
            Connection connection = DatabaseManager.getConnection();
            String query = "{CALL ziskej_nazvy_a_prumery_predmetu(?)}";
            CallableStatement callableStatement = connection.prepareCall(query);
            callableStatement.setInt(1, idStudent);
            ResultSet resultSet = callableStatement.executeQuery();

            // Vytvoření panelu pro zobrazení tabulky
            JPanel dataPanel = new JPanel();
            dataPanel.setLayout(new BorderLayout());

            // Vytvoření modelu pro tabulku
            DefaultTableModel tableModel = new DefaultTableModel();
            tableModel.addColumn("Název předmětu");
            tableModel.addColumn("Průměr hodnocení");

            // Naplnění tabulky daty z výsledku dotazu
            while (resultSet.next()) {
                String nazevPredmetu = resultSet.getString("nazev_predmetu");
                double prumerHodnoceni = resultSet.getDouble("prumer_hodnoceni");
                tableModel.addRow(new Object[]{nazevPredmetu, prumerHodnoceni});
            }

            // Vytvoření tabulky
            JTable table = new JTable(tableModel);
            JScrollPane scrollPane = new JScrollPane(table);

            // Přidání tabulky do panelu
            dataPanel.add(scrollPane, BorderLayout.CENTER);

            // Zobrazení v popup okně
            JOptionPane.showMessageDialog(null, dataPanel, "Průměr hodnocení studenta ID: " + idStudent, JOptionPane.PLAIN_MESSAGE);

            connection.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
            JOptionPane.showMessageDialog(null, "Chyba při zobrazování průměru hodnocení studenta: " + ex.getMessage(), "Chyba", JOptionPane.ERROR_MESSAGE);
        }
    }



    private void zobrazitStudentaPodleID() {
        String idStudentStr = String.valueOf(idStudent);
        String sqlQuery = "{CALL ZobrazitStudentaPodleID(?)}";
        zobrazTabulkuSID("Student", sqlQuery, "Zobrazit studenta", idStudent);
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
        pridejStudentaButton.addActionListener(e -> StudentManager.pridejStudenta());

        JButton prumerButton = new JButton("Zobraz průměr");
        prumerButton.addActionListener(e -> zobrazPrumerHodnoceniStudentu());

        JButton odeberStudentaButton = new JButton("Odebrat studenta");
        odeberStudentaButton.addActionListener(e -> {
            String idStudentStr = JOptionPane.showInputDialog(null, "Zadejte ID studenta k odebrání:", "Odebrat studenta", JOptionPane.PLAIN_MESSAGE);
            if (idStudentStr != null && !idStudentStr.isEmpty()) {
                int idStudent = Integer.parseInt(idStudentStr);
                StudentManager.odeberStudenta(idStudent);
            } else {
                JOptionPane.showMessageDialog(null, "Neplatný vstup.", "Chyba", JOptionPane.ERROR_MESSAGE);
            }
        });

        JPanel studentPanel = new JPanel();
        studentPanel.add(zobrazitStudentyButton);
        studentPanel.add(pridejStudentaButton);
        studentPanel.add(odeberStudentaButton);
        studentPanel.add(prumerButton);

        zobrazOkno(studentPanel);
    }


    private void zobrazOknoPredmet() {
        JButton zobrazitPredmetyButton = new JButton("Zobrazit předměty");
        zobrazitPredmetyButton.addActionListener(e -> zobrazitPredmety());

        JButton pridejPredmetButton = new JButton("Přidej předmět");
        pridejPredmetButton.addActionListener(e -> RozvrhManager.pridejPredmet());

        JButton zrusitPredmetButton = new JButton("Zrušit předmět");
        zrusitPredmetButton.addActionListener(e -> RozvrhManager.zrusitPredmet());

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
                HodnoceniManager.pridejHodnoceni();
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

    private void zobrazitPredmety() {
        String sqlQuery = "CALL ZobrazitPredmety()";
        zobrazTabulku("PREDMET", sqlQuery, "Zobrazit předměty");
    }

    private void zobrazitStudenty() {
        String sqlQuery = "CALL ZobrazitStudenty()";
        zobrazTabulku("STUDENT", sqlQuery, "Zobrazit studenty");

        // Přidání posluchače událostí pro kliknutí na buňku s ID studenta
        table.addMouseListener(new StudentMouseListener(table, this::zobrazAktivityStudenta));
    }


    private void zobrazTabulku(String nazevTabulky, String sqlQuery, String nazevTlacitka) {
        try {
            Connection connection = DatabaseManager.getConnection();

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

    private void zobrazTabulkuSID(String nazevTabulky, String sqlQuery, String nazevTlacitka, int idStudent) {
        try {
            Connection connection = DatabaseManager.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sqlQuery);
            preparedStatement.setInt(1, idStudent);
            ResultSet resultSet = preparedStatement.executeQuery();

            // Vytvoření panelu pro zobrazení tabulky
            JPanel dataPanel = new JPanel();
            dataPanel.setLayout(new BorderLayout());

            // Vytvoření modelu pro tabulku
            DefaultTableModel tableModel = new DefaultTableModel();

            // Získání informací o sloupcích z výsledku dotazu
            ResultSetMetaData metaData = resultSet.getMetaData();
            int columnCount = metaData.getColumnCount();
            for (int i = 1; i <= columnCount; i++) {
                tableModel.addColumn(metaData.getColumnLabel(i));
            }

            // Naplnění tabulky daty z výsledku dotazu
            while (resultSet.next()) {
                Object[] rowData = new Object[columnCount];
                for (int i = 1; i <= columnCount; i++) {
                    rowData[i - 1] = resultSet.getObject(i);
                }
                tableModel.addRow(rowData);
            }

            // Vytvoření tabulky
            JTable table = new JTable(tableModel);
            JScrollPane scrollPane = new JScrollPane(table);

            // Přidání tabulky do panelu
            dataPanel.add(scrollPane, BorderLayout.CENTER);

            // Zobrazení v popup okně
            JOptionPane.showMessageDialog(null, dataPanel, "Informace pro studenta s ID: " + idStudent, JOptionPane.PLAIN_MESSAGE);

            connection.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
            JOptionPane.showMessageDialog(null, "Chyba při zobrazování tabulky: " + ex.getMessage(), "Chyba", JOptionPane.ERROR_MESSAGE);
        }
    }




    private void zobrazitHodnoceni() {
        String sqlQuery = "CALL ZobrazitHodnoceni()"; // Zde voláme uloženou proceduru
        zobrazTabulku("HODNOCENI", sqlQuery, "Zobrazit hodnocení");
    }



    private void zobrazAktivityStudenta(int idStudent) {
        try {
            Connection connection = DatabaseManager.getConnection();
            String query = "{CALL ZobrazAktivityStudenta(?)}";
            CallableStatement callableStatement = connection.prepareCall(query);
            callableStatement.setInt(1, idStudent);
            ResultSet resultSet = callableStatement.executeQuery();

            // Získání informací z výsledku procedury
            StringBuilder sb = new StringBuilder();
            while (resultSet.next()) {
                sb.append("Aktivita: ").append(resultSet.getString("nazev")).append("\n");
            }

            // Zobrazení informací v popup okně
            JOptionPane.showMessageDialog(null, sb.toString(), "Aktivity studenta", JOptionPane.INFORMATION_MESSAGE);

            connection.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
            JOptionPane.showMessageDialog(null, "Chyba při zobrazování aktivit studenta: " + ex.getMessage(), "Chyba", JOptionPane.ERROR_MESSAGE);
        }
    }


    private void zobrazPrumerHodnoceniStudentu() {
        try {
            Connection connection = DatabaseManager.getConnection();
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM PrumerHodnoceniStudentu");

            // Zobrazení výsledků v tabulce
            DefaultTableModel tableModel = new DefaultTableModel();
            tableModel.addColumn("ID studenta");
            tableModel.addColumn("Průměr hodnocení");

            while (resultSet.next()) {
                int idStudent = resultSet.getInt("idStudent");
                double prumerHodnoceni = resultSet.getDouble("prumer");
                tableModel.addRow(new Object[]{idStudent, prumerHodnoceni});
            }

            // Zobrazení výsledků v tabulce Swing
            JTable table = new JTable(tableModel);
            JOptionPane.showMessageDialog(null, new JScrollPane(table), "Průměr hodnocení studentů", JOptionPane.PLAIN_MESSAGE);

            connection.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
            JOptionPane.showMessageDialog(null, "Chyba při zobrazování průměru hodnocení studentů: " + ex.getMessage(), "Chyba", JOptionPane.ERROR_MESSAGE);
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
